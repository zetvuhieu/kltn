import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import firestore from '@react-native-firebase/firestore';

const DataList = () => {
  const [loading, setLoading] = useState(true);
  const [highestValue, setHighestValue] = useState('');
  const [lowestValue, setLowestValue] = useState('');
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const documentSnapshot = await firestore()
        .collection('analytics')
        .doc('qDkyWOixmeP1VtK41fgL')
        .get();

      if (documentSnapshot.exists) {
        const fetchedData = documentSnapshot.data();
        setData(fetchedData.waterConsumed);

        const highest = fetchedData.waterConsumed.reduce(
          (acc, item) => {
            return parseFloat(item.vol) > parseFloat(acc.vol) ? item : acc;
          },
          {month: '', vol: '0'},
        );
        setHighestValue(highest);

        const lowest = fetchedData.waterConsumed.reduce(
          (acc, item) => {
            return parseFloat(item.vol) < parseFloat(acc.vol) ? item : acc;
          },
          {month: '', vol: Infinity.toString()},
        );
        setLowestValue(lowest);
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Prepare the data for the chart
  const prepareChartData = () => {
    return data.map(item => ({
      month: item.month,
      value: parseFloat(item.vol) || 0, // Convert volume to a number, default to 0 if NaN
    }));
  };

  const monthlyWaterData = prepareChartData();

  // Tính giá trị tối đa cho trục Y
  const maxValue = Math.max(...monthlyWaterData.map(item => item.value), 0);

  return (
    <View style={styles.container}>
      {loading ? (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <Text style={styles.title}>Monthly Water Data</Text>
          {monthlyWaterData.length > 0 ? (
            <>
              <BarChart
                data={{
                  labels: monthlyWaterData.map(item => item.month), // Nhãn tháng
                  datasets: [
                    {
                      data: monthlyWaterData.map(item => item.value), // Giá trị cho mỗi cột
                    },
                  ],
                }}
                width={320} // Độ rộng biểu đồ
                height={220} // Chiều cao biểu đồ
                yAxisLabel="" // Không hiển thị nhãn bên trái
                yAxisSuffix="" // Ký tự bổ sung cho giá trị trên trục Y
                fromZero={true} // Đảm bảo trục Y bắt đầu từ 0
                showValuesOnTopOfBars={false} // Hiển thị giá trị trên đầu mỗi thanh
                verticalLabelRotation={0} // Để nhãn tháng nằm ngang
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#f0f0f0', // Màu nền chuyển tiếp
                  backgroundGradientTo: '#ffffff', // Màu nền chuyển tiếp
                  decimalPlaces: 0,
                  barPercentage: 0.5,
                  color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`, // Màu cho cột
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Màu nhãn

                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#ffa726',
                    fontSize: 5,
                  },
                  propsForshowValuesOnTopOfBars: {
                    fontSize: 5, // Cỡ chữ nhỏ hơn
                  },
                  yAxisInterval: Math.ceil(maxValue / 10), // Điều chỉnh khoảng cách nhãn trên trục Y
                }}
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
              <View style={styles.containerInfomation}>
                <View style={styles.containerInfo}>
                  <Text style={styles.volumeTitle}>
                    Month of Highest Consumption: {highestValue.month}
                  </Text>
                  <Text style={styles.volumeTitle}>
                    Water Consumed: {highestValue.vol} m³
                  </Text>
                </View>
                <View style={styles.containerInfo}>
                  <Text style={styles.volumeText}>
                    Month of Lowest Consumption: {lowestValue.month}
                  </Text>
                  <Text style={styles.volumeText}>
                    Water Consumed: {lowestValue.vol} m³
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <Text>Không có dữ liệu cho biểu đồ</Text>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#343a40',
  },
  volumeTitle: {
    fontSize: 16,
    color: '#e3550e',
  },
  volumeText: {
    fontSize: 16,
    color: '#2277e6',
  },
  containerInfo: {
    marginTop: 15,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
    marginVertical: 5,
  },
});

export default DataList;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from 'react-native';
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

        // Sắp xếp dữ liệu theo thời gian giảm dần để lấy 7 tháng gần nhất
        const sortedData = fetchedData.waterConsumed.sort((a, b) => {
          const dateA = new Date(`${a.month}-01`);
          const dateB = new Date(`${b.month}-01`);
          return dateB - dateA; // Sắp xếp giảm dần
        });

        // Lấy 7 tháng gần nhất
        const recentData = sortedData.slice(0, 7);

        // Sắp xếp lại theo thời gian tăng dần
        const ascendingData = recentData.sort((a, b) => {
          const dateA = new Date(`${a.month}-01`);
          const dateB = new Date(`${b.month}-01`);
          return dateA - dateB; // Sắp xếp tăng dần
        });

        setData(ascendingData);

        // Tìm giá trị cao nhất và thấp nhất
        const highest = ascendingData.reduce(
          (acc, item) => {
            return parseFloat(item.vol) > parseFloat(acc.vol) ? item : acc;
          },
          {month: '', vol: '0'},
        );
        setHighestValue(highest);

        const lowest = ascendingData.reduce(
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
        <ScrollView>
          <Text style={styles.title}>Daily Water Data</Text>
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
                <View style={styles.containerTable}>
                  <View style={[styles.row, styles.header]}>
                    <Text style={[styles.cell, styles.headerText]}>Date</Text>
                    <Text style={[styles.cell, styles.headerText]}>
                      Consumed
                    </Text>
                  </View>
                  {data.map((item, index) => (
                    <View
                      key={index}
                      style={[
                        styles.row,
                        index % 2 === 0 ? styles.evenRow : styles.oddRow,
                      ]}>
                      <Text style={styles.cell}>{item.month}</Text>
                      <Text style={styles.cell}>{item.vol} L</Text>
                    </View>
                  ))}
                </View>
              </View>
            </>
          ) : (
            <Text>Không có dữ liệu cho biểu đồ</Text>
          )}
        </ScrollView>
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
  containerTable: {
    flex: 1,
    paddingTop: '5%',
    backgroundColor: '#f9f9f9',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  header: {
    backgroundColor: '#41aafa',
  },
  evenRow: {
    backgroundColor: '#f1f1f1',
  },
  oddRow: {
    backgroundColor: '#fff',
  },
  cell: {
    flex: 1,
    padding: 15,
    textAlign: 'center',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DataList;

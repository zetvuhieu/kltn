import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import firestore from '@react-native-firebase/firestore';

const DataList = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const documentSnapshot = await firestore()
        .collection('analytics_sub')
        .doc('analytics_sub')
        .get();

      if (documentSnapshot.exists) {
        const fetchedData = documentSnapshot.data();

        // Lấy dữ liệu daily từ Firestore
        const dailyData = fetchedData?.daily;

        // Kiểm tra nếu không có dữ liệu daily
        if (!dailyData || dailyData.length === 0) {
          throw new Error('No daily data found');
        }

        // Chuyển đổi dữ liệu thành dạng cần thiết
        const transformedData = dailyData.map(entry => ({
          day: entry.day,
          vol: parseFloat(entry.vol),
          humidity: parseFloat(entry.humidity),
          temperature: parseFloat(entry.temperature),
          rain: parseInt(entry.rain, 10),
        }));

        // Sắp xếp theo ngày giảm dần
        const sortedData = transformedData.sort((a, b) => {
          const dateA = new Date(a.day.split('-').reverse().join('-'));
          const dateB = new Date(b.day.split('-').reverse().join('-'));
          return dateB - dateA; // Sắp xếp giảm dần
        });

        // Lấy 7 ngày gần nhất
        const recentData = sortedData.slice(0, 7);
        setData(recentData);
      } else {
        throw new Error('No document found');
      }
    } catch (error) {
      console.error('Error fetching data: ', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Prepare the data for the chart and sort by day in ascending order
  const prepareChartData = () => {
    return data
      .map(item => ({
        day: item.day.split('-')[0], // Chỉ lấy phần ngày
        value: item.vol, // Dữ liệu về lượng nước tiêu thụ
      }))
      .sort((a, b) => parseInt(a.day) - parseInt(b.day)); // Sắp xếp theo thứ tự ngày (từ nhỏ đến lớn)
  };

  const monthlyWaterData = prepareChartData();
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
                  labels: monthlyWaterData.map(item => item.day),
                  datasets: [
                    {
                      data: monthlyWaterData.map(item => item.value),
                    },
                  ],
                }}
                width={320}
                height={220}
                fromZero={true}
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#f0f0f0',
                  backgroundGradientTo: '#ffffff',
                  decimalPlaces: 0,
                  barPercentage: 0.5,
                  color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  yAxisInterval: Math.ceil(maxValue / 10),
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
                      <Text style={styles.cell}>{item.day}</Text>
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

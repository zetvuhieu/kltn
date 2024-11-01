import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {BarChart} from 'react-native-chart-kit';

const DataList = () => {
  const node1Data = [
    {date: '01-01-1970', moil: '2400.00'},
    {date: '03-02-1970', moil: '1550.00'},
    {date: '04-03-1970', moil: '1740.00'},
    {date: '04-04-1970', moil: '1730.00'},
    {date: '04-05-1970', moil: '1840.00'},
    {date: '04-06-1970', moil: '1780.00'},
    {date: '04-07-1970', moil: '1570.00'},
    {date: '04-08-1970', moil: '1720.00'},
    {date: '04-09-1970', moil: '1755.00'},
    {date: '04-10-1970', moil: '1600.00'},
    {date: '04-11-1970', moil: '1900.00'},
    {date: '04-12-1970', moil: '1380.00'},
  ];

  const [loading, setLoading] = useState(true);

  const getMonthlyWaterData = () => {
    const monthlyData = {};

    node1Data.forEach(item => {
      const month = item.date.split('-')[1]; // Lấy tháng từ dữ liệu
      const moisture = parseFloat(item.moil);

      // Cộng dồn lượng nước theo tháng
      if (monthlyData[month]) {
        monthlyData[month] += moisture;
      } else {
        monthlyData[month] = moisture;
      }
    });

    return Object.entries(monthlyData).map(([month, value]) => ({
      month,
      value,
    }));
  };

  const monthlyWaterData = getMonthlyWaterData();

  // Tính giá trị tối đa cho trục Y
  const maxValue = Math.max(...monthlyWaterData.map(item => item.value), 0);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <Text style={styles.title}>Day Water Data</Text>
          {monthlyWaterData.length > 0 ? (
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default DataList;

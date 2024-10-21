import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ImageBackground, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import background from '../../../assets/background8.jpg';

const IrrigationSchedule = () => {
  const [timerData, setTimerData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const documentSnapshot = await firestore()
          .collection('system')
          .doc('2Guvl9gNbqPIgiKqU2v1')
          .get();

        if (documentSnapshot.exists) {
          const fetchedData = documentSnapshot.data();
          // Chuyển đổi dữ liệu timer thành mảng
          const timerArray = Object.entries(fetchedData.timer).map(
            ([key, time]) => ({
              id: key, // Sử dụng key để tạo id duy nhất
              time,
            }),
          );

          // Sắp xếp dữ liệu theo thứ tự mong muốn
          const order = ['first', 'second', 'third']; // Định nghĩa thứ tự
          timerArray.sort((a, b) => {
            return order.indexOf(a.id) - order.indexOf(b.id);
          });

          setTimerData(timerArray);
          console.log(timerArray); // In ra dữ liệu đã sắp xếp
        } else {
          console.log('Document does not exist!');
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.tableRow}>
      <Text style={styles.timeText}>{item.time}</Text>
      <Text style={styles.timeText}>2 hours</Text>
      {/* Có thể thay đổi thời gian tùy theo dữ liệu của bạn */}
    </View>
  );

  if (loading) {
    return <Text>Loading...</Text>; // Có thể thêm giao diện loading
  }

  return (
    <ImageBackground
      source={background}
      style={styles.background}
      imageStyle={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.text}>Irrigation Schedule</Text>
        <View style={styles.scheduleInformation}>
          <FlatList
            data={timerData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  backgroundImage: {
    borderRadius: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderWidth: 2,
    borderColor: '#f2e9e9',
    borderRadius: 15,
  },
  text: {
    flex: 1,
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#261a57',
  },
  scheduleInformation: {
    flex: 3,
    width: '90%',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingBottom: 6,
  },
  timeText: {
    fontSize: 12,
    color: '#333',
  },
});

export default IrrigationSchedule;

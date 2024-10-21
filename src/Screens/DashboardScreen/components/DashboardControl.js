import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  FlatList,
  Dimensions,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import background from '../../../assets/background5.jpg';
import backgroundItem from '../../../assets/background12.jpg';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTree} from '@fortawesome/free-solid-svg-icons';

// Number of columns in the grid
const numColumns = 2;
// Item size based on screen width
const size = Dimensions.get('window').width / numColumns - 20;

const DashboardBar = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timerData, setTimerData] = useState([]);
  const [nextIrrigationTimeFormatted, setNextIrrigationTimeFormatted] =
    useState('');

  // Firestore subscription to fetch data
  const subscribeToData = () => {
    return firestore()
      .collection('system')
      .doc('2Guvl9gNbqPIgiKqU2v1')
      .onSnapshot(
        documentSnapshot => {
          if (documentSnapshot.exists) {
            const fetchedData = documentSnapshot.data();
            setData(fetchedData.mode); // Assuming mode is the property you want
            setLoading(false);
          }
        },
        error => {
          console.error('Error fetching data: ', error);
          setLoading(false);
        },
      );
  };

  useEffect(() => {
    const unsubscribe = subscribeToData(); // Start listening for changes
    return () => unsubscribe(); // Cleanup on unmount
  }, []);
  const arrayItem = [
    {
      id: '1',
      name: 'Node 1',
      icon: faTree,
      temp: '25',
      humi: '72',
      vol: '1500',
    },
    {
      id: '2',
      name: 'Node 2',
      icon: faTree,
      temp: '25',
      humi: '72',
      vol: '1500',
    },
    {
      id: '3',
      name: 'Node 3',
      icon: faTree,
      temp: '25',
      humi: '74',
      vol: '1420',
    },
    {
      id: '4',
      name: 'Node 4',
      icon: faTree,
      temp: '25',
      humi: '68',
      vol: '1490',
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const documentSnapshot = await firestore()
          .collection('system')
          .doc('2Guvl9gNbqPIgiKqU2v1')
          .get();

        if (documentSnapshot.exists) {
          const fetchedData = documentSnapshot.data();
          // Convert timer data to array
          const timerArray = Object.entries(fetchedData.timer).map(
            ([key, time]) => ({
              id: key,
              time,
            }),
          );

          // Sort the timer array
          const order = ['first', 'second', 'third'];
          timerArray.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

          setTimerData(timerArray);
          console.log(timerArray);
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

  useEffect(() => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    // Find the next irrigation time
    const nextIrrigationTime = timerData.find(time => {
      const [hour, minute] = time.time.split(':');
      const hour24 = hour.includes('PM') ? parseInt(hour) + 12 : parseInt(hour);
      return (
        hour24 > currentHour ||
        (hour24 === currentHour && parseInt(minute) > currentMinute)
      );
    });

    // Calculate remaining time for the next irrigation
    let timeRemaining;
    if (nextIrrigationTime) {
      const [nextHour, nextMinute] = nextIrrigationTime.time.split(':');
      const nextHour24 = nextHour.includes('PM')
        ? parseInt(nextHour) + 12
        : parseInt(nextHour);
      const nextIrrigationDate = new Date(currentTime);
      nextIrrigationDate.setHours(nextHour24, parseInt(nextMinute), 0, 0);

      // Calculate remaining time in minutes
      timeRemaining = Math.ceil(
        (nextIrrigationDate - currentTime) / (1000 * 60),
      );

      const hoursRemaining = Math.floor(timeRemaining / 60);
      const minutesRemaining = timeRemaining % 60;

      setNextIrrigationTimeFormatted(
        `Next irrigation in ${hoursRemaining} hour(s) ${minutesRemaining} minute(s)`,
      );
    } else {
      setNextIrrigationTimeFormatted('No more scheduled irrigation for today.');
    }
  }, [timerData]);

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <ImageBackground
        source={backgroundItem}
        style={styles.backgroundItem}
        imageStyle={styles.backgroundImage}>
        <FontAwesomeIcon icon={item.icon} size={42} />
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDetail}>Temp: {item.temp}°C</Text>
        <Text style={styles.itemDetail}>Humi: {item.humi}%</Text>
        <Text style={styles.itemDetail}>Vol: {item.vol} mV</Text>
      </ImageBackground>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1257e0" />
      </View>
    );
  }

  return (
    <View style={styles.dashboard}>
      {data === 1 ? (
        <>
          <View style={styles.systemInfo}>
            <Text style={styles.title}>SYSTEM STATUS</Text>
            <Text style={styles.nextTime}>{nextIrrigationTimeFormatted}</Text>
          </View>

          <View style={styles.container}>
            <ImageBackground
              source={background}
              style={styles.background}
              imageStyle={styles.backgroundImage}>
              <FlatList
                data={arrayItem}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={numColumns}
                columnWrapperStyle={styles.columnWrapper}
              />
            </ImageBackground>
          </View>
        </>
      ) : (
        <Text style={styles.okText}>OK</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dashboard: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  background: {
    justifyContent: 'center',
  },
  backgroundImage: {
    borderRadius: 15,
  },
  itemContainer: {
    width: size,
    height: size * 1.12,
    marginVertical: 5,
    marginHorizontal: 5,
    marginTop: 7,
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  backgroundItem: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDetail: {
    fontSize: 14,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  okText: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
    color: '#1257e0',
  },
  systemInfo: {
    marginTop: '-10%',
    marginBottom: '5%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  nextTime: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default DashboardBar;

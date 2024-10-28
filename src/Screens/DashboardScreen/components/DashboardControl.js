import React, {useState, useEffect, useCallback} from 'react';
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
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTree} from '@fortawesome/free-solid-svg-icons';

import background from '../../../assets/background5.jpg';
import backgroundItem from '../../../assets/background12.jpg';

const numColumns = 2;
const size = Dimensions.get('window').width / numColumns - 20;

const DashboardBar = () => {
  const [data, setData] = useState(null);
  const [dataNode1, setDataNode1] = useState(null);
  const [dataNode2, setDataNode2] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timerData, setTimerData] = useState([]);
  const [nextIrrigationTimeFormatted, setNextIrrigationTimeFormatted] =
    useState('');
  const arrayItem =
    dataNode1 && dataNode2
      ? [
          {
            id: '0',
            name: 'Node 1',
            icon: faTree,
            temp: dataNode1.temp,
            humi: dataNode1.humi,
            vol: dataNode1.vol,
          },
          {
            id: '1',
            name: 'Node 2',
            icon: faTree,
            temp: dataNode2.temp,
            humi: dataNode2.humi,
            vol: dataNode2.vol,
          },
          {
            id: '2',
            name: 'Node 3',
            icon: faTree,
            temp: '25',
            humi: '72',
            vol: '1500',
          },
          {
            id: '3',
            name: 'Node 4',
            icon: faTree,
            temp: '25',
            humi: '74',
            vol: '1420',
          },
        ]
      : [];

  const subscribeToData = useCallback(() => {
    return firestore()
      .collection('system')
      .doc('2Guvl9gNbqPIgiKqU2v1')
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          setData(documentSnapshot.data()?.mode);
          setLoading(false);
        }
      }, handleFirestoreError);
  }, []);

  const fetchTimerData = useCallback(async () => {
    try {
      const documentSnapshot = await firestore()
        .collection('system')
        .doc('2Guvl9gNbqPIgiKqU2v1')
        .get();

      if (documentSnapshot.exists) {
        const fetchedData = documentSnapshot.data();
        const timerArray = Object.entries(fetchedData.timer).map(
          ([key, time]) => ({
            id: key,
            time,
          }),
        );
        setTimerData(
          timerArray.sort(
            (a, b) =>
              ['first', 'second', 'third'].indexOf(a.id) -
              ['first', 'second', 'third'].indexOf(b.id),
          ),
        );
      } else {
        console.log('Document does not exist!');
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const calculateNextIrrigationTime = useCallback(() => {
    const currentTime = new Date();
    const nextIrrigationTime = timerData.find(time => {
      const [hour, minute] = time.time.split(':');
      const hour24 = hour.includes('PM') ? parseInt(hour) + 12 : parseInt(hour);
      return (
        hour24 > currentTime.getHours() ||
        (hour24 === currentTime.getHours() &&
          parseInt(minute) > currentTime.getMinutes())
      );
    });

    if (nextIrrigationTime) {
      const [nextHour, nextMinute] = nextIrrigationTime.time.split(':');
      const nextHour24 = nextHour.includes('PM')
        ? parseInt(nextHour) + 12
        : parseInt(nextHour);
      const nextIrrigationDate = new Date(currentTime);
      nextIrrigationDate.setHours(nextHour24, parseInt(nextMinute), 0, 0);

      const timeRemaining = Math.ceil(
        (nextIrrigationDate - currentTime) / (1000 * 60),
      );
      setNextIrrigationTimeFormatted(
        `Next irrigation in ${Math.floor(timeRemaining / 60)} hour(s) ${
          timeRemaining % 60
        } minute(s)`,
      );
    } else {
      setNextIrrigationTimeFormatted('No more scheduled irrigation for today.');
    }
  }, [timerData]);

  const handleFirestoreError = error => {
    console.error('Error fetching data: ', error);
    setLoading(false);
  };

  const fecthDataNode1 = () => {
    return firestore()
      .collection('data_sub')
      .doc('node1')
      .onSnapshot(
        documentSnapshot => {
          if (documentSnapshot.exists) {
            const fetchedData = documentSnapshot.data();
            setDataNode1(fetchedData.node1);
            setLoading(false);
          }
        },
        error => {
          console.error('Error fetching data: ', error);
          setLoading(false);
        },
      );
  };

  const fecthDataNode2 = () => {
    return firestore()
      .collection('data_sub')
      .doc('node2')
      .onSnapshot(
        documentSnapshot => {
          if (documentSnapshot.exists) {
            const fetchedData = documentSnapshot.data();
            setDataNode2(fetchedData.node2);
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
    const unsubscribe = subscribeToData();
    return () => unsubscribe();
  }, [subscribeToData]);

  useEffect(() => {
    fetchTimerData();
  }, [fetchTimerData]);

  useEffect(() => {
    calculateNextIrrigationTime();
  }, [timerData, calculateNextIrrigationTime]);

  useEffect(() => {
    fecthDataNode1();
    fecthDataNode2();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <ImageBackground
        source={backgroundItem}
        style={styles.backgroundItem}
        imageStyle={styles.backgroundImage}>
        <FontAwesomeIcon icon={faTree} size={42} />
        <Text style={styles.itemName}>{item.name || 'Unnamed Node'}</Text>
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
                keyExtractor={(_, index) => index.toString()}
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
  loadingContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  dashboard: {flex: 1},
  systemInfo: {marginTop: '-10%', marginBottom: '5%'},
  title: {fontSize: 20, fontWeight: 'bold', marginBottom: 10},
  nextTime: {fontSize: 16, marginTop: 5},
  container: {flex: 1},
  background: {justifyContent: 'center'},
  backgroundImage: {borderRadius: 15},
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
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  backgroundItem: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemName: {fontSize: 18, fontWeight: 'bold'},
  itemDetail: {fontSize: 14},
  columnWrapper: {justifyContent: 'space-between'},
  okText: {fontSize: 24, textAlign: 'center', marginTop: 20, color: '#1257e0'},
});

export default DashboardBar;

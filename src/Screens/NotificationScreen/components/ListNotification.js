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
import {faBell} from '@fortawesome/free-regular-svg-icons';
import background from '../../../assets/background5.jpg';

const ListNotification = () => {
  const [data, setData] = useState(null);
  const [dataNode1, setDataNode1] = useState(null);
  const [dataNode2, setDataNode2] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  const fecthDataNode1 = () => {
    return firestore()
      .collection('data_sub')
      .doc('node1')
      .onSnapshot(
        documentSnapshot => {
          if (documentSnapshot.exists) {
            const fetchedData = documentSnapshot.data();
            const temp = fetchedData.node1.temp;
            const time = fetchedData.node1.date;
            setDataNode1(fetchedData.node1);
            setLoading(false);
            if (temp > 30) {
              setNotifications(prev => [
                `Node2: Nhiệt độ cao ${temp}°C! -${time} `,
                ...prev,
              ]);
            }
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
            const temp = fetchedData.node2.temp;
            const time = fetchedData.node2.date;
            setDataNode2(fetchedData.node2);
            setLoading(false);
            if (temp > 30) {
              setNotifications(prev => [
                `Node2: Nhiệt độ cao ${temp}°C! -${time} `,
                ...prev,
              ]);
            }
          }
        },
        error => {
          console.error('Error fetching data: ', error);
          setLoading(false);
        },
      );
  };

  useEffect(() => {
    fecthDataNode1();
    fecthDataNode2();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={background}
        style={styles.titleContainer}
        imageStyle={styles.backgroundImage}>
        <FontAwesomeIcon icon={faBell} size={32} color="#f6fc3a" />
      </ImageBackground>
      <FlatList
        data={notifications}
        renderItem={({item, index}) => (
          <View key={index} style={styles.notification}>
            <Text>{item}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    padding: 12,
    resizeMode: 'cover',
  },
  backgroundImage: {
    borderRadius: 8,
  },
  container: {},
  notification: {
    backgroundColor: '#e8e8e8',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default ListNotification;

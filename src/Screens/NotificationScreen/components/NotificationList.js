import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ImageBackground,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBell} from '@fortawesome/free-regular-svg-icons';
import background from '../../../assets/background5.jpg';

const NotificationList = () => {
  //Array chứa thông báo
  const Array = [
    'Cây số 1 nhiệt độ cao',
    'Cây số 5 nhiệt độ cao',
    'Cây số 3 nhiệt độ thấp',
    'Cây số 8 nhiệt độ cao',
    'Cây số 1 độ ẩm thấp',
    'Cây số 4 nhiệt độ cao',
    'Cây số 1 nhiệt độ cao',
    'Cây số 1 nhiệt độ cao',
    'Cây số 1 nhiệt độ cao',
    'Cây số 1 nhiệt độ cao',
    'Cây số 1 nhiệt độ cao',
    'Cây số 1 nhiệt độ cao',
    'Cây số 1 nhiệt độ cao',
    'Cây số 1 nhiệt độ cao',
    'Cây số 2 nhiệt độ cao',
    'Cây số 1 nhiệt độ cao',
  ];

  return (
    <View style={styles.container}>
      <ImageBackground
        source={background}
        style={styles.titleContainer}
        imageStyle={styles.backgroundImage}>
        <FontAwesomeIcon icon={faBell} size={32} color="#f6fc3a" />
      </ImageBackground>
      <FlatList
        data={Array}
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

export default NotificationList;

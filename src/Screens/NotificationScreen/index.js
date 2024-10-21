import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import Header from '../../Components/Header/index';
import NotificationList from './components/NotificationList';
import background from '../../assets/background6.jpg';
const NotificationScreen = () => {
  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Notification</Text>
          </View>
          <View style={styles.tableContainer}>
            <NotificationList style={styles.notificationList} />
          </View>
        </View>
        <Header style={styles.header} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#261a57',
    elevation: 10,
  },
  tableContainer: {
    flex: 1,
    width: '95%',
  },
  notificationList: {
    width: '100%', // Ensures NotificationList takes the full width of the container
  },
  header: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default NotificationScreen;

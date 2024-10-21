import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import background from '../../assets/background6.jpg';
import Header from '../../Components/Header/index';
import SettingsTable from './components/SettingsTable';

const SettingScreen = () => {
  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Settings</Text>
      </View>
      <View style={styles.container}>
        <SettingsTable />
      </View>
      <Header style={styles.header} />
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
  titleContainer: {
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
  header: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default SettingScreen;

import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import Header from '../../Components/Header/index';
import background from '../../assets/background6.jpg';
import PredictDay from './components/predictDay';
import PredictMonth from './components/predictMonth';

const HomeScreen = () => {
  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Water Usage Forecast</Text>
          </View>
          <View style={styles.tableContainer}>
            <PredictDay />
            <>
              <Text>
                --------------------------------------------------------------------
              </Text>
            </>
            <PredictMonth />
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
  tableContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '80%',
  },
  header: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default HomeScreen;

import React from 'react';
import StateControl from './stateControl';
import PredictConsumption from './predictConsumtion';
import IrrigationSchedule from './irrigationSchedule';
import Temperature from './temperature';
import DataWeather from './dataWeather';
import {View, StyleSheet} from 'react-native';

const TableControl = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.card}>
          <StateControl />
        </View>
        <View style={styles.card}>
          <IrrigationSchedule />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.card}>
          <Temperature />
        </View>
        <View style={styles.card}>
          <DataWeather />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'column',
  },
  row: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  card: {
    width: '50%',
    height: 150,
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    shadowColor: 'pink',
    elevation: 15,
    margin: 5,
  },
});

export default TableControl;

import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import SetTimer from './SetTimer';
import IrrigationByGrowth from './IrrigationByGrowth';

const SettingsTable = () => {
  return (
    <>
      <View style={styles.container}>
        <SetTimer />
        <IrrigationByGrowth />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 2},
});
export default SettingsTable;

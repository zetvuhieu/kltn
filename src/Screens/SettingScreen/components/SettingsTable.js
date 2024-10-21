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

const SettingsTable = () => {
  return (
    <>
      <View style={styles.container}>
        <SetTimer />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});
export default SettingsTable;

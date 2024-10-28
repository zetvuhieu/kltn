import React, {useState} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import background from '../../assets/background6.jpg';
import Header from '../../Components/Header/index';
import DashboardBar from './components/DashboardBar';
import Chart from './components/Chart';
import ChartBar from './components/ChartBar';

const DashboardScreen = () => {
  const [selected, setSelected] = useState(true);

  const handleSelectionChange = selectedOption => {
    setSelected(selectedOption === 'Month');
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Dashboard</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.modeContainer}>
            <DashboardBar onSelectionChange={handleSelectionChange} />
          </View>
          <View style={styles.tableContainer}>
            {selected ? <Chart /> : <ChartBar />}
          </View>
        </View>
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
  modeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '8%',
    marginTop: -50,
  },
  tableContainer: {
    flex: 3,
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

export default DashboardScreen;

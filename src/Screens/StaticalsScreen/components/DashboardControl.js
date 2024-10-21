import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {RadioButton} from 'react-native-paper';
import background from '../../../assets/background9.jpg';

const DashboardBar = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMode, setMode] = useState('auto');

  const fetchData = async () => {
    try {
      const documentSnapshot = await firestore()
        .collection('system')
        .doc('2Guvl9gNbqPIgiKqU2v1')
        .get();

      if (documentSnapshot.exists) {
        const fetchedData = documentSnapshot.data();
        setData(fetchedData);
        setMode(fetchedData.mode === 0 ? 'manual' : 'auto');
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sendControlSignal = async value => {
    try {
      const signal = value === 'automatic' ? 1 : 0;
      await firestore()
        .collection('system')
        .doc('2Guvl9gNbqPIgiKqU2v1')
        .update({mode: signal});

      console.log(`Sent signal: ${signal}`);
    } catch (error) {
      console.error('Error sending control signal: ', error);
    } finally {
      fetchData();
    }
  };

  const handleRadioChange = value => {
    setMode(value === 'automatic' ? 'auto' : 'manual');
    sendControlSignal(value);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1257e0" />
      </View>
    );
  }
  return (
    <ImageBackground
      source={background}
      style={styles.background}
      imageStyle={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.radioItem}>
          <RadioButton
            value="automatic"
            status={isMode === 'auto' ? 'checked' : 'unchecked'}
            onPress={() => handleRadioChange('automatic')}
          />
          <Text style={styles.text}>Automatic</Text>
        </View>
        <View style={styles.radioItem}>
          <RadioButton
            value="manual"
            status={isMode === 'manual' ? 'checked' : 'unchecked'}
            onPress={() => handleRadioChange('manual')}
          />
          <Text style={styles.text}>Manual</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    resizeMode: 'cover',
  },
  backgroundImage: {
    borderRadius: 15,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#f2e9e9',
    flexDirection: 'row',
    borderRadius: 15,
    padding: 5,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
    color: '#261a57',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
});

export default DashboardBar;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import background from '../../../assets/background5.jpg';

const API_KEY = 'http://192.168.123.18:5000';

const PredictMonth = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [predict, setPredict] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_KEY}/predict_water_consumption`);
      setData(response.data);
    } catch (error) {
      setError('Error fetching data');
      Alert.alert('Error', 'Could not fetch data from the server');
    } finally {
      setLoading(false);
    }
  };

  const handlePredict = () => {
    setPredict(true);
    setIsButtonVisible(false);
    fetchData();
  };

  if (loading) {
    return (
      <ImageBackground
        source={background}
        style={styles.background}
        imageStyle={styles.backgroundImage}>
        <View style={styles.container}>
          <Text style={styles.text}>Forecast for Next Month</Text>
          <View style={styles.content}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        </View>
      </ImageBackground>
    );
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <ImageBackground
      source={background}
      style={styles.background}
      imageStyle={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.text}>Forecast for Next Month</Text>
        {isButtonVisible && (
          <View style={styles.content}>
            <View style={styles.content}>
              <View style={styles.buttonWrapper}>
                <Button title="Start" onPress={handlePredict} />
              </View>
            </View>
          </View>
        )}
        {predict && data && (
          <View style={styles.content}>
            <View style={styles.table}>
              {/* Header Row */}
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderCell}>Next Month</Text>
                <Text style={styles.tableHeaderCell}>Predict Usage</Text>
              </View>
              {/* Data Row */}
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{data.next_month}</Text>
                <Text style={styles.tableCell}>
                  {Number(data.predicted_water_consumption).toFixed(2)} L
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '80%',
    flex: 1,
    resizeMode: 'cover',
  },
  backgroundImage: {
    width: '100%',
    borderRadius: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderWidth: 2,
    borderColor: '#f2e9e9',
    borderRadius: 15,
  },
  text: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  content: {
    width: '80%',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    width: '100%',
    borderRadius: 25, // Adjust the value for more/less rounded corners
    overflow: 'hidden', // This ensures the button's rounded corners are visible
    backgroundColor: '#1257e0', // Optional, to give the button a background color
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableHeaderCell: {
    flex: 1,
    padding: 12,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    padding: 16,
    fontSize: 14,
    textAlign: 'center',
    height: 50,
    fontWeight: 'bold',
    color: '#9fdb2e',
  },
});

export default PredictMonth;

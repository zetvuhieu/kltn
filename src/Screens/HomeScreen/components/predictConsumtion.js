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
import background from '../../../assets/background4.jpg';

const PredictConsumption = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [predict, setPredict] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true); // Trạng thái để ẩn/hiện nút

  // Gọi API khi component mount
  const fetchData = async () => {
    setLoading(true); // Bắt đầu trạng thái loading
    try {
      const response = await axios.get(
        'http://192.168.2.107:5000/predict_water_consumption',
      );
      setData(response.data); // Lưu dữ liệu từ response vào state
    } catch (error) {
      setError('Error fetching data');
      Alert.alert('Error', 'Could not fetch data from the server');
    } finally {
      setLoading(false); // Kết thúc trạng thái loading
    }
  };

  const handlePredict = () => {
    setPredict(true);
    setIsButtonVisible(false); // Ẩn nút khi nhấn
    fetchData();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Predict</Text>
        <View style={styles.content}>
          <ActivityIndicator size="large" color="#1257e0" />
        </View>
      </View>
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
        <Text style={styles.text}>Predict</Text>
        <View style={styles.stateControl}>
          {isButtonVisible && <Button title="Start" onPress={handlePredict} />}
        </View>
        {predict && data && (
          <View style={styles.stateControl}>
            <Text style={styles.text}>{data.next_month}</Text>
            <Text style={styles.text}>{data.predicted_water_consumption}</Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  backgroundImage: {
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
    color: '#261a57',
  },
  stateControl: {
    flex: 2,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconWrapper: {
    backgroundColor: 'transparent',
    borderRadius: 20,
  },
  shadowEffect: {
    elevation: 25,
    shadowColor: '#c5cf13',
  },
  content: {
    marginBottom: 20,
  },
});

export default PredictConsumption;

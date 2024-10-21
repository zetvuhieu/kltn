import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {fetchWeatherData} from '../../../utils/weatherUtils';
import background from '../../../assets/background2.jpg';

const CITY_NAME = 'Buon Ma Thuot';

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await fetchWeatherData(CITY_NAME);
        setWeather(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={background}
      style={styles.background}
      imageStyle={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.text}>Parameters</Text>
        <View style={styles.content}>
          {weather ? (
            <View style={styles.dataContainer}>
              <View style={styles.childContainer}>
                <Text style={styles.key}>Temp:</Text>
                <Text style={styles.tempValue}>{weather.main.temp}°C</Text>
              </View>
              <View style={styles.childContainer}>
                <Text style={styles.key}>Humi:</Text>
                <Text style={styles.humiValue}>{weather.main.humidity}%</Text>
              </View>
              <View style={styles.childContainer}>
                <Text style={styles.key}>Wind:</Text>
                <Text style={styles.windValue}>{weather.wind.speed} km/h</Text>
              </View>
            </View>
          ) : (
            <Text>No weather data found</Text>
          )}
        </View>
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
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#261a57',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
  },
  childContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 3,
    paddingBottom: 3,
  },
  key: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#58727a',
    flex: 1,
  },
  tempValue: {
    fontSize: 12.5,
    color: '#eb4217',
    fontWeight: 'bold',
    flex: 1.6,
    fontFamily: 'serif',
  },
  humiValue: {
    fontSize: 12.5,
    color: '#177afc',
    fontWeight: 'bold',
    flex: 1.6,
    fontFamily: 'serif',
  },
  windValue: {
    fontSize: 12.5,
    color: '#2795ab',
    fontWeight: 'bold',
    flex: 1.6,
    fontFamily: 'serif',
  },
});

export default WeatherApp;

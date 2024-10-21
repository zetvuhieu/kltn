import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ImageBackground,
} from 'react-native';
import {fetchWeatherData} from '../../../utils/weatherUtils';
import background from '../../../assets/background3.jpg';

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
    <>
      <ImageBackground
        source={background}
        style={styles.background}
        imageStyle={styles.backgroundImage}>
        <View style={styles.container}>
          <Text style={styles.text}>Weather</Text>
          <View style={styles.content}>
            {weather ? (
              <View style={styles.dataContainer}>
                <Image
                  source={{
                    uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
                  }}
                  style={styles.weatherIcon}
                />
                <Text style={styles.textValue}>
                  {weather.weather[0].description}
                </Text>
              </View>
            ) : (
              <Text>No weather data found</Text>
            )}
          </View>
        </View>
      </ImageBackground>
    </>
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
    alignItems: 'center',
  },
  weatherIcon: {
    width: 60,
    height: 60,
  },
  textValue: {fontSize: 18, color: '#0db53f', marginBottom: 10},
});

export default WeatherApp;

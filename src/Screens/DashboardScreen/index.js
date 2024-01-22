import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import background from '../../assets/background1.jpg';
import axios from 'axios';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import GauseTemp from '../../Components/GauseTemp';
import MeasureHumi from '../../Components/MeasureHumi';

const Homescreen = () => {
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);

  const fetchDataFromThingSpeak = async () => {
    try {
      // Tạo URL yêu cầu HTTP với ID kênh của bạn
      const channelId = '2287996';
      const response = await axios.get(
        `https://api.thingspeak.com/channels/${channelId}/feeds.json?results=1`,
      );

      // Lấy dữ liệu JSON từ phản hồi
      const data = response.data;
      const humidityValue = parseInt(data.feeds[0].field2);
      const temperatureValue = parseInt(data.feeds[0].field1);
      setTemperature(temperatureValue);
      setHumidity(humidityValue);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu từ ThingSpeak:', error);
    }
  };

  useEffect(() => {
    // Bắt đầu lấy dữ liệu và cập nhật nhiệt độ một lần khi màn hình được tạo
    fetchDataFromThingSpeak();

    // Thiết lập interval để cập nhật dữ liệu liên tục mỗi 2 giây (hoặc bất kỳ thời gian nào bạn muốn)
    const intervalId = setInterval(fetchDataFromThingSpeak, 2000);

    // Hủy interval khi màn hình bị hủy
    return () => clearInterval(intervalId);
  }, []);

  return (
    <ImageBackground source={background} style={styles.background}>
      <View>
        <Header />
        <View style={styles.container}>
          <View>
            <GauseTemp value={temperature} />
          </View>
          <View style={{marginTop: 80}}>
            <MeasureHumi humidityValue={humidity} />
          </View>
        </View>
      </View>
      <Footer />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default Homescreen;

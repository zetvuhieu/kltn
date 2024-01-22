import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFaucet, faFaucetDrip} from '@fortawesome/free-solid-svg-icons';

const StateContainer = () => {
  const [field4Value, setField4Value] = useState('');
  const [field5Value, setField5Value] = useState('');
  const [stateActivity, setStateActivity] = useState('');
  const [stateOfControls, setStateOfControls] = useState('');
  useEffect(() => {
    const fetchDataFromThingSpeak = () => {
      const channelId = '2275732';
      const apiKey = '5BLXP0TJEVSLC60J';
      axios
        .get(
          `https://api.thingspeak.com/channels/${channelId}/feeds.json?results=1&api_key=${apiKey}`,
        )
        .then(respone => {
          const data = respone.data;
          const field4AsNumber = parseInt(data.feeds[0].field4);

          if (field4AsNumber === 0) {
            setStateActivity('Auto'); // Nếu field4 bằng 0, đặt mode là true (auto)
          } else if (field4AsNumber === 1) {
            setStateActivity('Thủ công');
          } else {
            setStateActivity('Hệ thống đang lỗi');
          }

          setField4Value(field4AsNumber);
        })
        .catch(error => {
          console.error('Lỗi khi lấy dữ liệu từ ThingSpeak:', error);
        })
        .finally(() => {
          // Sau khi lấy dữ liệu, gọi lại hàm sau một khoảng thời gian
          setTimeout(fetchDataFromThingSpeak, 1000); // Cập nhật sau mỗi 5 giây
        });
    };
    fetchDataFromThingSpeak();
  }, []);

  useEffect(() => {
    const getField5 = () => {
      const channel = '2275652';
      const api = 'T5GNV8NZR8HGMYBK';
      axios
        .get(
          `https://api.thingspeak.com/channels/${channel}/feeds.json?results=1&api_key=${api}`,
        )
        .then(respone => {
          const data = respone.data;
          const field5AsNumber = parseInt(data.feeds[0].field5);

          if (field5AsNumber === 0) {
            setStateOfControls('Hệ thống đã tắt');
          } else if (field5AsNumber === 1) {
            setStateOfControls('Hệ thống đã bật');
          } else {
            setStateOfControls('lỗi');
          }

          setField5Value(field5AsNumber);
        })
        .catch(error => {
          console.error('Lỗi khi lấy dữ liệu từ ThingSpeak:', error);
        })
        .finally(() => {
          // Sau khi lấy dữ liệu, gọi lại hàm sau một khoảng thời gian
          setTimeout(getField5, 1000); // Cập nhật sau mỗi 5 giây
        });
    };
    getField5();
  }, []);

  return (
    <View style={styles.StateContainer}>
      <View style={styles.Container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Trạng thái: {stateActivity}</Text>
        </View>
        <View style={styles.StateOfContainer}>
          {field5Value === 1 && (
            <FontAwesomeIcon icon={faFaucetDrip} size={36} color="yellow" />
          )}
          {field5Value === 0 && (
            <FontAwesomeIcon icon={faFaucet} size={36} color="black" />
          )}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  StateContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  Container: {
    width: '85%',
    height: 120,
    backgroundColor: '#078af5',
    alignItems: 'center',
    borderRadius: 8,
  },
  textContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    borderBottomStyle: 'solid',
  },
  text: {
    fontSize: 19,
    color: '#f4fc03',
    padding: 15,
    fontWeight: '400',
  },
  StateOfContainer: {
    padding: 10,
  },
});
export default StateContainer;

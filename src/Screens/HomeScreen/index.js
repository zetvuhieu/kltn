import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  Switch,
} from 'react-native';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import axios from 'axios';
import background from '../../assets/background1.jpg';
import StateContainer from '../../Components/StateContainer';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faGear,
  faDroplet,
  faTemperature3,
  faGauge,
} from '@fortawesome/free-solid-svg-icons';

const HomeScreen = () => {
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');
  const [field4, setField4] = useState('');
  const [field5, setField5] = useState('');

  const [mode, setMode] = useState(false);
  const [control, setControl] = useState(false);

  const apiKey = 'BQ72T6FIW9GOT56P'; // Thay YOUR_API_KEY bằng khóa API của bạn

  useEffect(() => {
    const fetchDataFromThingSpeak = () => {
      // Fetch the latest data from ThingSpeak
      const channelId = '2287996';
      axios
        .get(
          `https://api.thingspeak.com/channels/${channelId}/feeds.json?results=1&api_key=${apiKey}`,
        )
        .then(response => {
          const data = response.data;
          setField1(data.feeds[0].field1);
          setField2(data.feeds[0].field2);
          setField3(data.feeds[0].field3);

          const field4AsNumber = parseInt(data.feeds[0].field4);

          if (field4AsNumber === 0) {
            setMode(false); // Nếu field3 bằng 0, đặt mode là true (auto)
          } else if (field4AsNumber === 1) {
            setMode(true); // Nếu field3 bằng 1, đặt mode là false (manual)
          }

          setField4(field4AsNumber);
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
    const fetchDataField4 = () => {
      // Fetch the latest data from ThingSpeak
      const channelId = '2275732';
      const api = '5BLXP0TJEVSLC60J';
      axios
        .get(
          `https://api.thingspeak.com/channels/${channelId}/feeds.json?results=1&api_key=${api}`,
        )
        .then(response => {
          const data = response.data;
          const field4AsNumber = parseInt(data.feeds[0].field4);

          if (field4AsNumber === 0) {
            setMode(false); // Nếu field3 bằng 0, đặt mode là true (auto)
          } else if (field4AsNumber === 1) {
            setMode(true); // Nếu field3 bằng 1, đặt mode là false (manual)
          }
        })
        .catch(error => {
          console.error('Lỗi khi lấy dữ liệu từ ThingSpeak:', error);
        })
        .finally(() => {
          // Sau khi lấy dữ liệu, gọi lại hàm sau một khoảng thời gian
          setTimeout(fetchDataField4, 1000); // Cập nhật sau mỗi 5 giây
        });
    };

    fetchDataField4();
  }, []);
  useEffect(() => {
    const fetchDataControl = () => {
      // Fetch the latest data from ThingSpeak
      const channelId = '2275652';
      const api = 'T5GNV8NZR8HGMYBK';
      axios
        .get(
          `https://api.thingspeak.com/channels/${channelId}/feeds.json?results=1&api_key=${api}`,
        )
        .then(response => {
          const data = response.data;
          const field5AsNumber = parseInt(data.feeds[0].field5);

          if (field5AsNumber === 0) {
            setControl(false); // Nếu field3 bằng 0, đặt mode là true (auto)
          } else if (field5AsNumber === 1) {
            setControl(true); // Nếu field3 bằng 1, đặt mode là false (manual)
          }
        })
        .catch(error => {
          console.error('Lỗi khi lấy dữ liệu từ ThingSpeak:', error);
        })
        .finally(() => {
          // Sau khi lấy dữ liệu, gọi lại hàm sau một khoảng thời gian
          setTimeout(fetchDataControl, 1000); // Cập nhật sau mỗi 5 giây
        });
    };

    fetchDataControl();
  }, []);

  const sendValueToMode = (field, value) => {
    const api = '5BLXP0TJEVSLC60J';
    const updateURL = `https://api.thingspeak.com/update?api_key=${api}&field${field}=${value}`;

    // Make a POST request to update the field value
    axios
      .post(updateURL)
      .then(response => {
        if (response.status === 200) {
          console.log(`Field${field} updated to ${value}`);
        } else {
          console.error('Error updating ThingSpeak channel.');
        }
      })
      .catch(error => {
        console.error('Lỗi khi cập nhật dữ liệu lên ThingSpeak:', error);
      });
  };
  const sendValueToControl = (field, value) => {
    const api = 'T5GNV8NZR8HGMYBK';
    const updateURL = `https://api.thingspeak.com/update?api_key=${api}&field${field}=${value}`;

    // Make a POST request to update the field value
    axios
      .post(updateURL)
      .then(response => {
        if (response.status === 200) {
          console.log(`Field${field} updated to ${value}`);
        } else {
          console.error('Error updating ThingSpeak channel.');
        }
      })
      .catch(error => {
        console.error('Lỗi khi cập nhật dữ liệu lên ThingSpeak:', error);
      });
  };

  const toggleMode = () => {
    const fieldValue = mode ? 0 : 1; // Nếu đang ở chế độ Auto, thì gửi giá trị 0, ngược lại gửi giá trị 1
    sendValueToMode(4, fieldValue); // Cập nhật field4 với giá trị tương ứng
  };
  const toggleControl = () => {
    const fieldValue = control ? 0 : 1; // Nếu đang ở chế độ Auto, thì gửi giá trị 0, ngược lại gửi giá trị 1
    sendValueToControl(5, fieldValue); // Cập nhật field4 với giá trị tương ứng
  };

  useEffect(() => {
    let interval;
    if (!mode) {
      interval = setInterval(() => {
        sendValueToControl(5, 0);
      }, 20000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [!mode]);

  return (
    <ImageBackground source={background} style={styles.background}>
      <View>
        <View>
          <Header />
        </View>
        <View style={styles.content}>
          <View style={styles.valueContent}>
            <View style={styles.valueTexts}>
              <FontAwesomeIcon icon={faDroplet} size={24} color="#1257e0" />
              <Text style={styles.valueText}>Độ ẩm: {field2}%</Text>
            </View>
          </View>
          <View style={styles.valueContent}>
            <View style={styles.valueTexts}>
              <FontAwesomeIcon
                icon={faTemperature3}
                size={24}
                color="#e01912"
              />
              <Text style={styles.valueText}>Nhiệt độ: {field1}°C</Text>
            </View>
          </View>
          <View style={styles.valueContent}>
            <View style={styles.valueTexts}>
              <FontAwesomeIcon icon={faGauge} size={24} color="#305224" />
              <Text style={styles.valueText}>Độ ẩm đất: {field3}</Text>
            </View>
          </View>
        </View>
        <View style={styles.controlContainer}>
          <View style={styles.control}>
            <View style={styles.titleContainer}>
              <FontAwesomeIcon icon={faGear} size={24} color="#2da679" />
              <Text style={styles.title}>Control</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Text style={{fontSize: 18, marginBottom: 10}}>
                {mode ? 'Manual' : 'Auto'}
              </Text>
              <Switch value={mode} onValueChange={toggleMode} />
            </View>
            {mode && (
              <View style={styles.buttonContainer}>
                <Text style={{fontSize: 18, marginBottom: 10}}>
                  {control ? 'On' : 'Off'}
                </Text>
                <Switch value={control} onValueChange={toggleControl} />
              </View>
            )}
          </View>
        </View>
        <StateContainer />
      </View>
      <Footer />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueContent: {
    width: 200,
    height: 55,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    borderRadius: 6,
  },
  valueTexts: {
    flexDirection: 'row',
  },
  valueText: {
    fontSize: 18,
    marginLeft: 5,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  mode: {
    width: 150,
    margin: 15,
  },
  controlContainer: {
    marginTop: 80,
    justifyContent: 'center', // Để căn giữa theo chiều dọc
    alignItems: 'center', // Để căn giữa theo chiều ngang
  },
  control: {
    backgroundColor: '#0ddfff',
    height: 200,
    width: 340,
    borderRadius: 6,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Để căn giữa theo chiều dọc
    alignItems: 'center', // Để căn giữa theo chiều ngang
  },
  title: {
    fontSize: 25,
    color: '#2da679',
    padding: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    width: 70,
    margin: 15,
  },
});

export default HomeScreen;

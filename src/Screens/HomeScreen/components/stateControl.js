import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLightbulb} from '@fortawesome/free-regular-svg-icons';
import firestore from '@react-native-firebase/firestore';
import background from '../../../assets/background4.jpg';

const StateControl = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const documentSnapshot = await firestore()
          .collection('system')
          .doc('2Guvl9gNbqPIgiKqU2v1')
          .get();

        if (documentSnapshot.exists) {
          const fetchedData = documentSnapshot.data();
          setData(fetchedData);

          // Kiểm tra giá trị của control để cập nhật trạng thái của Switch
          if (fetchedData.control === 1) {
            setIsEnabled(true); // Bật switch nếu control = 1
          } else {
            setIsEnabled(false); // Tắt switch nếu control = 0
          }
        } else {
          console.log('Document does not exist!');
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sendControlSignal = async signal => {
    try {
      await firestore()
        .collection('system')
        .doc('2Guvl9gNbqPIgiKqU2v1')
        .update({control: signal});

      console.log(`Sent signal: ${signal}`);
    } catch (error) {
      console.error('Error sending control signal: ', error);
    }
  };

  // Hàm đổi trạng thái của switch và gửi tín hiệu lên Firestore
  const toggleSwitch = () => {
    //khi nhấn switch thì đảo trạng thái
    const newStatus = !isEnabled;
    setIsEnabled(newStatus);

    //kiểm tra trạng thái để gửi dữ liệu tương ứng
    const signal = newStatus ? 1 : 0;
    sendControlSignal(signal);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <ActivityIndicator size="large" color="#1257e0" />
        </View>
      </View>
    );
  }

  return (
    <ImageBackground
      source={background}
      style={styles.background}
      imageStyle={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.text}>System Status</Text>
        <View style={styles.stateControl}>
          <Switch
            thumbColor={isEnabled ? '#426afc' : '#ffffff'}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <View style={(styles.iconWrapper, isEnabled && styles.shadowEffect)}>
            <FontAwesomeIcon
              icon={faLightbulb}
              size={40}
              color={isEnabled ? '#c5cf13' : '#d3d3d3'}
            />
          </View>
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
    flex: 1,
    fontSize: 16,
    marginBottom: 10,
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
});

export default StateControl;

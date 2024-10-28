import React, {useState} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {Button} from 'react-native-paper'; // Import Button from react-native-paper
import background from '../../../assets/background9.jpg';

const DashboardBar = ({onSelectionChange}) => {
  const [selected, setSelected] = useState('Month');
  const [selectedCheck, setSelectedCheck] = useState(true);

  const handlePress = option => {
    setSelected(option);
    setSelectedCheck(!selectedCheck);
    onSelectionChange(option);
  };

  return (
    <ImageBackground
      source={background}
      style={styles.background}
      imageStyle={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.radioItem}>
          <Button
            mode="contained"
            onPress={() => handlePress('Month')}
            style={styles.button}
            labelStyle={[
              styles.link,
              {color: selected === 'Month' ? '#e2e61c' : '#ffffff'},
            ]}>
            Month
          </Button>
        </View>
        <View style={styles.radioItem}>
          <Button
            mode="contained"
            onPress={() => handlePress('Day')}
            style={styles.button}
            labelStyle={[
              styles.link,
              {color: selected === 'Day' ? '#e2e61c' : '#ffffff'},
            ]}>
            Day
          </Button>
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
    padding: 10,
  },
  button: {
    marginHorizontal: 8,
    backgroundColor: '#63948e',
  },
  link: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
});

export default DashboardBar;

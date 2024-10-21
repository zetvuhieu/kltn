import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClockFour, faCalendarDays} from '@fortawesome/free-regular-svg-icons';

const TilteComponent = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup when component unmounts
    return () => clearInterval(timer);
  }, []);

  // Date formatting
  const formatDate = date => {
    const dateOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    const timeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };

    const formattedDate = date.toLocaleDateString(undefined, dateOptions);
    const formattedTime = date.toLocaleTimeString(undefined, timeOptions);

    return {formattedDate, formattedTime};
  };

  const {formattedDate, formattedTime} = formatDate(currentDateTime);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <FontAwesomeIcon icon={faCalendarDays} size={30} color="blue" />
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
      <View style={styles.section}>
        <FontAwesomeIcon icon={faClockFour} size={30} color="blue" />
        <Text style={styles.time}>{formattedTime}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90%',
    padding: 10,
  },
  section: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#defdff',
    shadowColor: '#396fed',
    elevation: 15,
  },
  date: {
    fontSize: 18,
    color: '#1f2124',
    marginTop: 5,
  },
  time: {
    fontSize: 18,
    color: '#1f2124',
    marginTop: 5,
  },
});

export default TilteComponent;

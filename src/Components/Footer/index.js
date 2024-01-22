import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCopyright} from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.footerContent}>
        <Text style={styles.text}>Copyright</Text>
        <FontAwesomeIcon
          icon={faCopyright}
          size={18}
          color="black"
          style={styles.icon}
        />
        <Text style={styles.text}>2023 Nhom1</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'lightgray',
    padding: 10,
    alignItems: 'center',
  },
  footerContent: {
    flexDirection: 'row', // Sắp xếp các phần tử theo hàng ngang
    justifyContent: 'center', // Căn giữa các phần tử
    alignItems: 'center', // Căn theo chiều dọc
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5, // Khoảng cách giữa chữ và biểu tượng
  },
  icon: {
    marginRight: 5, // Khoảng cách giữa biểu tượng và năm
  },
});

export default Header;

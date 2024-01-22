import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Link, useLocation} from 'react-router-native';

const Header = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const location = useLocation();

  useEffect(() => {
    // Cập nhật màu sắc sau khi chuyển trang hoàn tất
    if (location.pathname === '/dashboard') {
      setCurrentPage('dashboard');
    } else {
      setCurrentPage('home');
    }
  }, [location.pathname]);

  const handlePress = page => {
    setCurrentPage(page);
  };

  return (
    <View style={styles.header}>
      <Link
        to="/"
        onPress={() => handlePress('home')}
        underlayColor="transparent">
        <Text
          style={[
            styles.link,
            {color: currentPage === 'home' ? '#ffffff' : '#477065'},
          ]}>
          Home
        </Text>
      </Link>
      <Link
        to="/dashboard"
        onPress={() => handlePress('dashboard')}
        underlayColor="transparent">
        <Text
          style={[
            styles.link,
            {color: currentPage === 'dashboard' ? '#ffffff' : '#477065'},
          ]}>
          Dashboard
        </Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ccc',
    padding: 10,
  },
  link: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Header;

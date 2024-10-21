import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Link, useLocation} from 'react-router-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faChartSimple,
  faHouse,
  faBell,
  faSliders,
  faGear,
} from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const location = useLocation();

  const pages = [
    {name: 'home', path: '/', icon: faHouse},
    {name: 'dashboard', path: '/dashboard', icon: faSliders},
    {name: 'staticals', path: '/staticals', icon: faChartSimple},
    {name: 'notification', path: '/notification', icon: faBell},
    {name: 'setting', path: '/setting', icon: faGear},
  ];

  useEffect(() => {
    const currentPath = location.pathname;

    if (currentPath === '/dashboard') {
      setCurrentPage('dashboard');
    } else if (currentPath === '/staticals') {
      setCurrentPage('staticals');
    } else if (currentPath === '/notification') {
      setCurrentPage('notification');
    } else if (currentPath === '/setting') {
      setCurrentPage('setting');
    } else {
      setCurrentPage('home');
    }
  }, [location.pathname]);

  const handlePress = path => {
    setCurrentPage(path);
  };

  const NavLink = ({page}) => {
    return (
      <>
        <View>
          <Link
            style={styles.navLink}
            to={page.path}
            onPress={() => handlePress(page.name)}
            underlayColor="transparent">
            <FontAwesomeIcon
              style={[
                styles.link,
                {color: currentPage === page.name ? '#572de0' : '#8c9696'},
              ]}
              icon={page.icon}
              size={24}
            />
          </Link>
        </View>
      </>
    );
  };

  return (
    <>
      <View style={styles.header}>
        {pages.map(page => (
          <NavLink key={page.name} page={page} />
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#d5dfe0',
  },
  navLink: {padding: 18},
  link: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Header;

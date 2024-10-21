import React from 'react';
import {NativeRouter, Routes, Route, Link} from 'react-router-native';
import HelloScreen from './src/Screens/HomeScreen/index';
import DashboardScreen from './src/Screens/DashboardScreen/index';
import ControlScreen from './src/Screens/StaticalsScreen/index';
import NotificationList from './src/Screens/NotificationScreen/index';
import SettingScreen from './src/Screens/SettingScreen/index';

const App = () => {
  return (
    <NativeRouter>
      <Routes>
        <Route path="/" element={<HelloScreen />} />
        <Route path="/staticals" element={<ControlScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/notification" element={<NotificationList />} />
        <Route path="/setting" element={<SettingScreen />} />
      </Routes>
    </NativeRouter>
  );
};

export default App;

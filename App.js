import React from 'react';
import {NativeRouter, Routes, Route, Link} from 'react-router-native';
import HelloScreen from './src/Screens/HomeScreen/index';
import DashboardScreen from './src/Screens/DashboardScreen/index';

const App = () => {
  return (
    <NativeRouter>
      

      <Routes>
        <Route path="/" element={<HelloScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
      </Routes>
    </NativeRouter>
  );
};

export default App;
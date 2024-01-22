import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Circle, G, Line, Text as SvgText} from 'react-native-svg';

const Gauge = ({value}) => {
  const minTemperature = -10; // Giá trị nhiệt độ tối thiểu
  const maxTemperature = 80; // Giá trị nhiệt độ tối đa

  // Chuyển đổi giá trị nhiệt độ thành góc (0 - 360 độ)
  const temperatureAngle =
    ((value - minTemperature) * 360) / (maxTemperature - minTemperature);
  const temperatureRadians = (temperatureAngle * Math.PI) / 180;

  const radius = 110;
  const centerX = 150;
  const centerY = 150;

  // Tạo mảng các mốc và nhãn
  const markers = [];
  for (let i = -10; i <= 70; i += 10) {
    const angle =
      ((i - minTemperature) * 360) / (maxTemperature - minTemperature);
    const radians = (angle * Math.PI) / 180;

    const x1 = centerX - Math.sin(radians) * (radius - 30);
    const y1 = centerY - Math.cos(radians) * (radius - 30);
    const x2 = centerX - Math.sin(radians) * (radius - 30);
    const y2 = centerY - Math.cos(radians) * (radius - 30);

    markers.push(
      <G key={i}>
        <Line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeWidth="2" />
        <SvgText
          x={x2}
          y={y2 + 10}
          textAnchor="middle"
          fill="black"
          fontSize="12">
          {i}°C
        </SvgText>
      </G>,
    );
  }

  // Tạo kim chỉ
  const needleLength = 50;
  const needleX =
    centerX - Math.sin(temperatureRadians) * (radius - needleLength);
  const needleY =
    centerY - Math.cos(temperatureRadians) * (radius - needleLength);

  return (
    <View>
      <Svg height="300" width="300">
        <G>
          {/* Vòng tròn nền */}
          <Circle cx={centerX} cy={centerY} r={radius} fill="lightgray" />

          {/* Vòng tròn đường viền */}
          <Circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="transparent"
            stroke="black"
            strokeWidth="4"
          />

          {/* Kim chỉ */}
          <Line
            x1={centerX}
            y1={centerY + 15}
            x2={needleX}
            y2={needleY}
            stroke="red"
            strokeWidth="3"
          />

          {/* Mốc và nhãn */}
          {markers}

          {/* Giá trị nhiệt độ */}
          <SvgText
            x={centerX}
            y={centerY + 10}
            textAnchor="middle"
            fill="black"
            fontSize="24">
            {value}°C
          </SvgText>
        </G>
      </Svg>
      <View style={styles.TextvalueContainer}>
        <Text style={styles.Textvalue}>Temperature: {value}°C</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextvalueContainer: {
    margin: -30,
    alignItems: 'center',
  },
  Textvalue: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default Gauge;

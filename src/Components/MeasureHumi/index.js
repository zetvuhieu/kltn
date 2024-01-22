import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Svg, {Circle, G} from 'react-native-svg';

const HumidityMeterHalfCircle = ({humidityValue}) => {
  const maxHumidity = 100;
  const meterRadius = 100; // Bán kính của thanh đo vòng tròn
  const strokeWidth = 20; // Độ dày của đường vẽ
  const totalBars = 180;
  const barAngle = 180 / totalBars;

  // Tính toán số lượng vạch dựa trên giá trị độ ẩm
  const barsToShow = (humidityValue / maxHumidity) * totalBars;

  const bars = [];
  for (let i = 0; i < totalBars; i++) {
    const isBright = i < barsToShow;
    const angle = i * barAngle;

    const x =
      meterRadius * Math.cos((angle - 90) * (Math.PI / 180)) + meterRadius;
    const y =
      meterRadius * Math.sin((angle - 90) * (Math.PI / 180)) + meterRadius;

    const barColor = isBright ? '#3498db' : '#ded1ce';

    bars.push(
      <Circle
        key={i}
        cx={x}
        cy={y}
        r={10} // Độ dày của vạch thanh đo
        fill={barColor}
      />,
    );
  }

  return (
    <View style={styles.container}>
      <Svg
        width={meterRadius * 2 + strokeWidth * 10}
        height={meterRadius + strokeWidth}>
        <G
          transform={`translate(${meterRadius}, ${
            meterRadius * 2 + strokeWidth * 0.5
          }) rotate(-90)`}>
          {bars}
        </G>
      </Svg>
      <View style={styles.value}>
        {/* Hiển thị giá trị độ ẩm */}
        <Text style={styles.humidityValueText}>Humidity: {humidityValue}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 20,
  },
  value: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    backgroundColor: '#3498db',
    width: 180,
    height: 55,
    borderRadius: 10,
  },
  humidityValueText: {
    fontSize: 20,
    color: '#ffffff',
  },
});

export default HumidityMeterHalfCircle;

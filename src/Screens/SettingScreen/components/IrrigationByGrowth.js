import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';

const IrrigationByGrowth = () => {
  const [selectedStage, setSelectedStage] = useState('');
  const [stage, setStage] = useState('loading');

  const fetchData = async () => {
    try {
      const documentSnapshot = await firestore()
        .collection('system')
        .doc('qcJ37RHKShPAXhNDrKOp')
        .get();

      if (documentSnapshot.exists) {
        const fetchedData = documentSnapshot.data();
        setStage(fetchedData.stage);
        setSelectedStage(fetchedData.stage);
      } else {
        console.log('Document does not exist!');
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleStage = async stage => {
    try {
      await firestore()
        .collection('system')
        .doc('qcJ37RHKShPAXhNDrKOp')
        .update({stage: stage});

      fetchData();
    } catch (error) {
      console.error('Error sending control signal: ', error);
    }
  };

  const GrowthArray = [
    'Seedling Stage',
    'Vegetative Stage',
    'Flowering Stage',
    'Fruiting Stage',
    'Mature Fruit Stage',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Growth Stage</Text>

      {/* Picker cho hiệu ứng cuộn */}
      <Picker
        selectedValue={selectedStage}
        style={styles.picker}
        onValueChange={itemValue => {
          setSelectedStage(itemValue);
          handleStage(itemValue);
        }}
        mode="dropdown">
        {GrowthArray.map((stage, index) => (
          <Picker.Item key={index} label={stage} value={stage} />
        ))}
      </Picker>
      <View>
        <Text>{stage}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  selectedText: {
    fontSize: 16,
    marginTop: 20,
    color: '#333',
  },
  picker: {
    width: 300,
    height: 50, // Điều chỉnh chiều cao để có không gian cuộn thoải mái
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 20,
  },
});

export default IrrigationByGrowth;

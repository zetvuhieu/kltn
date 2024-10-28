import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Modal,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const TimeTable = () => {
  const [timerData, setTimerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const documentSnapshot = await firestore()
          .collection('system')
          .doc('2Guvl9gNbqPIgiKqU2v1')
          .get();

        if (documentSnapshot.exists) {
          const fetchedData = documentSnapshot.data();
          setTimerData(fetchedData.timer);
          console.log(fetchedData.timer);
        } else {
          console.log('Document does not exist!');
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const timerArray = timerData
    ? Object.entries(timerData)
        .map(([key, value]) => ({
          id: key,
          hour: value,
        }))
        .sort((a, b) => {
          const order = ['first', 'second', 'third'];
          return order.indexOf(a.id) - order.indexOf(b.id);
        })
    : [];

  const handleEditPress = item => {
    setSelectedId(item.id);
    setSelectedHour(item.hour);
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (selectedId && selectedHour) {
      // Cập nhật Firestore
      await firestore()
        .collection('system')
        .doc('2Guvl9gNbqPIgiKqU2v1')
        .update({
          [`timer.${selectedId}`]: selectedHour, // Cập nhật trường cụ thể
        });

      // Cập nhật state local
      setTimerData(prevData => ({
        ...prevData,
        [selectedId]: selectedHour,
      }));

      setModalVisible(false);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.hour}</Text>
      <Button title="Edit" onPress={() => handleEditPress(item)} />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bảng Giờ</Text>
      <View style={styles.header}>
        <Text style={styles.headerCell}>STT</Text>
        <Text style={styles.headerCell}>Giờ</Text>
        <Text style={styles.headerCell}>Edit Giờ</Text>
      </View>
      <FlatList
        data={timerArray}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      {/* Modal cho chỉnh sửa giờ */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chỉnh Sửa Giờ</Text>
            <TextInput
              style={styles.input}
              value={selectedHour}
              onChangeText={setSelectedHour}
            />
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Lưu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    paddingBottom: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TimeTable;

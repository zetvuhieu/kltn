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
      <View style={styles.cell}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleEditPress(item)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>
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
      <Text style={styles.title}>Watering Scheduler</Text>
      <View style={styles.table}>
        <View style={styles.header}>
          <Text style={styles.headerCell}>Ordinal</Text>
          <Text style={styles.headerCell}>Time Slot</Text>
          <Text style={styles.headerCell}>Actions</Text>
        </View>
        <FlatList
          data={timerArray}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>

      {/* Modal cho chỉnh sửa giờ */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Time Adjustment</Text>
            <TextInput
              style={styles.input}
              value={selectedHour}
              onChangeText={setSelectedHour}
            />
            <View style={styles.editTimeContainer}>
              <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
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
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
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
  editTimeContainer: {
    width: '100%',
    flexDirection: 'row', // Các nút sẽ xếp ngang
    justifyContent: 'center', // Căn giữa các nút theo chiều ngang
    alignItems: 'center', // Căn giữa các nút theo chiều dọc
    gap: 20, // Khoảng cách giữa các nút (tuỳ chỉnh)
  },
});

export default TimeTable;

import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList, Image } from 'react-native';
import { RootStackParamList } from '../../navigation';
import { fetchPost, fetchSingle } from '../api/axios';

export const ExerciseDetailScreen = ({ navigation, route }: NativeStackScreenProps<RootStackParamList, 'ExerciseDetailScreen'>) => {
  const userIdMocked = '4cb4866b-a240-419a-b4f2-3d762d29eb17'
  const params = route.params;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [workouts, setWorkouts] = useState<Array<any>>([])
  const [exerciseIds, setExerciseIds] = useState<Array<string>>([]);

  useEffect(() => {
    setExerciseIds([params.exercise.id])
    fetchSingle(`local/workouts/user/${userIdMocked}`, 'get')
      .then(result => {
        setWorkouts(result)
      })
  }, [])

  const handleAddExerciseToWorkoutList = async (workoutId: string) => {
    await fetchPost(`local/workouts/${workoutId}/exercise`, 'post', { exerciseIds })
    setIsModalVisible(false)
  }

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: params.exercise.url }} />
      <View style={styles.detailContainer}>
        <Text style={styles.name}>{params.exercise.name}</Text>
        <Text style={styles.equipment}>Equipment: {params.exercise.equipment}</Text>
        <Text style={styles.target}>Target: {params.exercise.target}</Text>
        <Text style={styles.bodyPart}>Body part: {params.exercise.bodyPart}</Text>
      </View>
      <TouchableOpacity
        onPress={handleOpenModal}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Add to workout list</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleCloseModal}
        style={styles.modal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Workouts</Text>
              <TouchableOpacity onPress={handleCloseModal}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={workouts}
              renderItem={({ item }) => (
                <View style={styles.workoutContainer}>
                  <Text style={styles.workoutTitle}>{item.title}</Text>
                  <TouchableOpacity style={styles.addButton} onPress={() => handleAddExerciseToWorkoutList(item.id)}>
                    <Text>Add</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  button: {
    backgroundColor: '#333',
    padding: 10,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  modal: {
    flex: 0.5,
    alignSelf: 'flex-end',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "45%"
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  workoutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
  },
  workoutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: 'lightgreen',
    padding: 5,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  detailContainer: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  equipment: {
    fontSize: 18,
    color: '#555',
    marginBottom: 8,
  },
  target: {
    fontSize: 18,
    color: '#555',
    marginBottom: 8,
  },
  bodyPart: {
    fontSize: 18,
    color: '#555',
  },
});

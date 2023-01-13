import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, Image, StyleSheet, TouchableOpacity, LayoutAnimation, Modal, Platform, UIManager, FlatList } from 'react-native';
import { RootStackParamList } from '../../navigation';
import { fetchPost, fetchSingle } from '../api/axios';

export function ExerciseDetailScreen({ navigation, route }: NativeStackScreenProps<RootStackParamList, 'ExerciseDetailScreen'>) {
  const userIdMocked = '4cb4866b-a240-419a-b4f2-3d762d29eb17'
  const params = route.params;

  const [workouts, setWorkouts] = useState<Array<any>>([])
  const [exerciseIds, setExerciseIds] = useState<Array<string>>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setExerciseIds([params.exercise.id])
    fetchSingle(`local/workouts/user/${userIdMocked}`, 'get')
      .then(result => {
        setWorkouts(result)
      })
  }, [])

  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  const handleCloseModal = () => {
    LayoutAnimation.configureNext({
      duration: 200,
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
    });
    setIsVisible(false);
  };

  const handleAddExerciseToWorkoutList = async (workoutId: string) => {
    await fetchPost(`local/workouts/${workoutId}/exercise`, 'post', { exerciseIds })
    setIsVisible(false)
  }

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
        onPress={() => setIsVisible(true)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Add to workout list</Text>
      </TouchableOpacity>
      <Modal
        animationType="none"
        transparent={true}
        visible={isVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={[styles.modalContainer, { flex: 1, flexDirection: 'column', position: 'relative' }]}>
              <View style={styles.headerModalContainer}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Workouts</Text>
                <TouchableOpacity onPress={handleCloseModal}>
                  <Text>Close</Text>
                </TouchableOpacity>
              </View>

              <FlatList
                style={{ width: '100%', flex: 1 }}
                data={workouts}
                renderItem={({ item }) => (
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{item.title}</Text>
                    <TouchableOpacity style={styles.addButton} onPress={() => handleAddExerciseToWorkoutList(item.id)
                    }>
                      <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  detailContainer: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain',
    marginBottom: 20,
    alignSelf: 'flex-start',
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
  button: {
    backgroundColor: '#333',
    padding: 10,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 8,
    width: '100%',
    height: '8%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    width: '100%',
    height: '45%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerModalContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-between' },
  addButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})

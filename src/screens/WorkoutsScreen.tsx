import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { RootStackParamList } from '../../navigation';
import { fetchSingle } from '../api/axios';

export function WorkoutsScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'WorkoutsScreen'>) {
  const userIdMocked = '4cb4866b-a240-419a-b4f2-3d762d29eb17'

  const [workouts, setWorkouts] = useState<Array<any>>([]);

  useEffect(() => {
    fetchSingle(`local/workouts/user/${userIdMocked}`, 'get')
      .then(result => {
        setWorkouts(result)
      })
  }, [])

  const handleAddPress = () => {
    navigation.navigate('CreateWorkoutScreen');
  };

  const handleRemovePress = (workoutId: string) => {
    fetchSingle(`/local/user/${userIdMocked}/workouts/${workoutId}`, 'delete')
      .then(() => setWorkouts(workouts.filter(workout => workout.id !== workoutId)))
  };

  const handleWorkoutPress = (workout: any) => {
    console.log({ workout })
    navigation.navigate('WorkoutDetailScreen', { workout })
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Workouts</Text>
        <TouchableOpacity style={styles.createWorkoutButton} onPress={handleAddPress}>
          <Text style={styles.createWorkoutButtonText}>Create Workout</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={workouts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleWorkoutPress(item)}>
            <View style={styles.workoutContainer}>
              <Text style={styles.workoutName}>{item.title}</Text>
              <Text style={styles.exerciseCount}>Exercises: {item.exercises.length}</Text>
              <TouchableOpacity style={styles.removeButton} onPress={() => handleRemovePress(item.id)}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  createWorkoutButton: {
    backgroundColor: 'black',
    borderRadius: 5,
    alignSelf: 'center',
    padding: 10,
  },
  createWorkoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  workoutContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
    marginVertical: 10,
  },
  workoutName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  exerciseCount: {
    color: 'gray',
    marginBottom: 10,
  },
  exerciseListContainer: {
    marginBottom: 10,
  },
  exercise: {
    marginLeft: 10,
    marginBottom: 5,
  },
  removeButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    alignSelf: 'flex-end',
    padding: 10,
  },
  removeButtonText: {
    backgroundColor: 'red',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  }
})
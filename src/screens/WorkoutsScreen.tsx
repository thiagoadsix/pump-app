import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { RootStackParamList } from '../../navigation';

interface Workout {
  id: number;
  name: string;
  exercises: Array<string>;
}

export function WorkoutsScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'WorkoutsScreen'>) {
  const [workouts, setWorkouts] = useState<Array<Workout>>([
    { id: 1, name: 'Chest and Triceps', exercises: ['Barbell Bench Press', 'Dumbbell Flyes', 'Cable Tricep Extension'] },
    { id: 2, name: 'Back and Biceps', exercises: ['Deadlifts', 'Barbell Rows', 'Dumbbell Curls'] },
    { id: 3, name: 'Back and Biceps', exercises: ['Deadlifts', 'Barbell Rows', 'Dumbbell Curls'] },
    { id: 4, name: 'Back and Biceps', exercises: ['Deadlifts', 'Barbell Rows', 'Dumbbell Curls'] },
  ]);

  const handleAddPress = () => {
    navigation.navigate('CreateWorkoutScreen');
  };

  const handleRemovePress = (workoutId: number) => {
    setWorkouts(workouts.filter(workout => workout.id !== workoutId));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.createWorkoutButton} onPress={handleAddPress}>
        <Text style={styles.createWorkoutButtonText}>Create Workout</Text>
      </TouchableOpacity>
      <FlatList
        data={workouts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.workoutContainer}>
            <Text style={styles.workoutName}>{item.name}</Text>
            <Text style={styles.exerciseCount}>Exercises: {item.exercises.length}</Text>
            <View style={styles.exerciseListContainer}>
              {item.exercises.map((exercise, index) => (
                <Text key={index} style={styles.exercise}>- {exercise}</Text>
              ))}
            </View>
            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemovePress(item.id)}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
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
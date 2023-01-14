import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { RootStackParamList } from '../../navigation';
import { ExerciseComponent } from '../components/ExerciseComponent';
import { ExerciseI } from '../interfaces/ExerciseI';

export const WorkoutDetailScreen = ({ navigation, route }: NativeStackScreenProps<RootStackParamList, 'WorkoutDetailScreen'>) => {
  const params = route.params

  const handleExercisePress = (exercise: ExerciseI) => {
    navigation.navigate('ExerciseDetailScreen', { exercise })
  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.workoutContainer}>
        <Text style={styles.workoutName}>{params.workout.title}</Text>
        <Text style={styles.exerciseCount}>Exercises: {params.workout.exercises.length}</Text>
      </View>
      <View style={styles.container}>
        <ScrollView style={styles.listContainer}>
          {params.workout.exercises.map((exercise: ExerciseI, index: React.Key | null | undefined) => (
            <ExerciseComponent key={index} exercise={exercise} handlePress={handleExercisePress} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  listContainer: {
    width: '100%',
    maxWidth: 400,
    padding: 15,
  }
});


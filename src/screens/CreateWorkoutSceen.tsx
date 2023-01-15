import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';
import { fetchPost } from '../api/axios';

export function CreateWorkoutScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'CreateWorkoutScreen'>) {
  const userIdMocked = '4cb4866b-a240-419a-b4f2-3d762d29eb17'

  const [workoutName, setWorkoutName] = useState<string>('');

  const handleCreatePress = () => {
    fetchPost('local/workouts', 'post', { title: workoutName, userId: userIdMocked }).then(() => {
      navigation.navigate('BodyPartScreen')
    })
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={workoutName}
        onChangeText={setWorkoutName}
        autoFocus={true}
        editable={true}
        placeholder="Workout Name"
      />
      <TouchableOpacity style={styles.createButton} onPress={handleCreatePress}>
        <Text style={styles.createButtonText}>Create Workout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerA: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  equipmentContainerA: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainerA: {
    width: '100%',
    maxWidth: 400,
    padding: 15,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  exerciseContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedExercise: {
    backgroundColor: '#e5e5e5',
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  createButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  createButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  selectedButton: {
    backgroundColor: '#e5e5e5',
    borderColor: 'black',
  },
  buttonText: {
    color: 'gray',
    fontWeight: 'bold',
  },
});

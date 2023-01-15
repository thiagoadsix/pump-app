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
  }
});

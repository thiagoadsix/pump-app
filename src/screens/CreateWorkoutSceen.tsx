import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';
import { fetchSingle } from '../api/axios';
import { WhichTypeListComponent } from '../components/WhichTypeListComponent';
import { ExerciseComponent } from '../components/ExerciseComponent';

const equipments = [
  'assisted',
  'band',
  'barbell',
  'body weight',
  'bosu ball',
  'cable',
  'dumbbell',
  'elliptical machine',
  'ez barbell',
  'hammer',
  'kettlebell',
  'leverage machine',
  'medicine ball',
  'olympic barbell',
  'resistance band',
  'roller',
  'rope',
  'skierg machine',
  'sled machine',
  'smith machine',
  'stability ball',
  'stationary bike',
  'stepmill machine',
  'tire',
  'trap bar',
  'upper body ergometer',
  'weighted',
  'wheel roller'
];

interface Exercise {
  id: string;
  name: string;
  equipment: string;
  target: string;
  bodyPart: string;
}

const data: Array<Exercise> = [
  // data here
  { id: "1", name: 'Chest and Triceps', equipment: 'Rope', target: 'Chest', bodyPart: 'Chest' },
  { id: "2", name: 'Chest and Triceps', equipment: 'Rope', target: 'Chest', bodyPart: 'Chest' },
  { id: "3", name: 'Chest and Triceps', equipment: 'Rope', target: 'Chest', bodyPart: 'Chest' },
];

export function CreateWorkoutScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'CreateWorkoutScreen'>) {
  const [workoutName, setWorkoutName] = useState<string>('');
  const [selectedExercises, setSelectedExercises] = useState<Array<string>>([]);
  const [selectedButton, setSelectedButton] = useState<string>();
  const [exercises, setExercises] = useState<Array<any>>([]);
  const [selected, setSelected] = useState<string>('assisted');
  const buttons = [
    { title: 'Equipment' },
    { title: 'Target' },
    { title: 'Body-Part' },
  ];

  const handleExercisePress = (exercise: Exercise) => {
    if (selectedExercises.includes(exercise.id)) {
      setSelectedExercises(selectedExercises.filter(id => id !== exercise.id));
    } else {
      setSelectedExercises([...selectedExercises, exercise.id]);
    }
  };

  const handleCreatePress = () => {
    // handle workout creation here
  };

  const handlePress = () => {}

  const onButtonPress = (which: string) => {
    setSelectedButton(which);

    const screensMap = {
      Equipment: 'equipment',
      Target: 'target',
      'Body-Part': 'body-part'
    } as any

    console.log({ which })

    fetchSingle(`local/exercises/${screensMap[which]}/${selected}`, 'get')
      .then(result => {
        setExercises(result);
      });

    // navigation.navigate(screensMap[which])
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={workoutName}
        onChangeText={setWorkoutName}
        placeholder="Workout Name"
      />
      <View style={styles.buttonContainer}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, selectedButton === button.title && styles.selectedButton]}
            onPress={() => onButtonPress(button.title)}
          >
            <Text style={styles.buttonText}>{button.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedButton && <View style={styles.containerA}>
        <View style={styles.equipmentContainerA}>
          <WhichTypeListComponent
            data={equipments}
            selected={selected}
            setSelected={setSelected}
            horizontal
          />
        </View>
        <ScrollView style={styles.listContainerA}>
          {exercises.map((exercise, index) => (
            <ExerciseComponent key={index} exercise={exercise} handlePress={handlePress} />
          ))}
        </ScrollView>
      </View>}
      {/* <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.exerciseContainer,
              selectedExercises.includes(item.id) && styles.selectedExercise
            ]}
            onPress={() => handleExercisePress(item)}
          >
            <Text style={styles.exerciseName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      /> */}
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
    marginVertical: 10,
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
    marginTop: 20,
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

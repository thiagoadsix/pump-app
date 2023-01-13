import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { ExerciseI } from '../interfaces/ExerciseI';

interface Props {
  exercise: ExerciseI;
  handlePress: (exercise: any) => void;
}

export const ExerciseComponent: React.FC<Props> = ({ exercise, handlePress }) => {
  return (
    <TouchableOpacity style={styles.exerciseContainer} onPress={() => handlePress(exercise)}>
      <Image
        style={styles.image}
        source={{ uri: exercise.url }}
      />
      <View style={styles.exerciseTextContainer}>
        <Text style={styles.name}>{exercise.name}</Text>
        <Text style={styles.equipment}>Equipment: {exercise.equipment}</Text>
        <Text style={styles.target}>Target: {exercise.target}</Text>
        <Text style={styles.bodyPart}>Body part: {exercise.bodyPart}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    width: '100%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  listContainer: {
    width: '100%',
    maxWidth: 400,
    padding: 15,
  },
  exerciseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
    elevation: 1,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 25,
    marginRight: 15,
  },
  exerciseTextContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  equipment: {
    fontSize: 16,
    color: '#555',
    marginTop: 8,
  },
  target: {
    fontSize: 16,
    color: '#555',
    marginTop: 8,
  },
  bodyPart: {
    fontSize: 16,
    color: '#555',
    marginTop: 8,
  },
});
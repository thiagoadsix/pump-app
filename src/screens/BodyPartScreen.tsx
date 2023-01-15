import { View, StyleSheet, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { fetchSingle } from '../api/axios';
import { RootStackParamList } from '../../navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ExerciseComponent } from '../components/ExerciseComponent';
import { WhichTypeListComponent } from '../components/WhichTypeListComponent';

export function BodyPartScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'BodyPartScreen'>) {
  const [selected, setSelected] = useState<string>('back');
  const [exercises, setExercises] = useState<Array<any>>([]);

  useEffect(() => {
    fetchSingle(`local/exercises/body-part/${selected}`, 'get')
      .then(result => {
        setExercises(result);
      });
  }, [selected]);

  const handlePress = (exercise: any) => {
    navigation.navigate('ExerciseDetailScreen', { exercise });
  };

  const bodyParts = ['back', 'chest', 'lower arms', 'lower legs', 'neck', 'shoulders', 'upper arms', 'upper legs', 'waist'
  ];

  return (
    <View style={styles.container}>
      <View style={styles.bodyPartContainer}>
        <WhichTypeListComponent
          data={bodyParts}
          selected={selected}
          setSelected={setSelected}
          horizontal
        />
      </View>
      <ScrollView style={styles.listContainer}>
        {exercises.map((exercise, index) => (
          <ExerciseComponent key={index} exercise={exercise} handlePress={handlePress} />
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  bodyPartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    marginTop: 20,
    width: '100%',
    maxWidth: 400,
  }
});

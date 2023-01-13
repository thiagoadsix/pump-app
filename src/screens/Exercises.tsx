import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { useState } from 'react';
import {  ScrollView, StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../../navigation';
import { fetchSingle } from '../api/axios';
import { ExerciseComponent } from '../components/ExerciseComponent';


export function Exercises({ navigation }: NativeStackScreenProps<RootStackParamList, 'Exercises'>) {
  const [data, setData] = useState<any[]>([{}])

  useEffect(() => {
    fetchSingle('local/exercises/body-part/neck', 'get')
      .then(result => {
        setData(result)
      })
  }, [])

  const handlePress = (exercise: any) => {
    navigation.navigate('ExerciseDetailScreen', {exercise})
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.listContainer}>
        {data.map((exercise, index) => (
          <ExerciseComponent key={index} exercise={exercise} handlePress={handlePress}  />
        ))}
      </ScrollView>
    </View>
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
  listContainer: {
    width: '100%',
    maxWidth: 400,
    padding: 15,
  }
});
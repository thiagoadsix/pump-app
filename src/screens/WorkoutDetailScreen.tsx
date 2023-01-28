import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, FlatList, Text } from 'native-base';

import { RootStackParamList } from '../../navigation';
import { ExerciseI } from '../interfaces/ExerciseI';
import { SetComponent } from '../components/SetComponent';

export function WorkoutDetailScreen({ navigation, route }: NativeStackScreenProps<RootStackParamList, 'WorkoutDetailScreen'>) {
  const params = route.params

  const handleExercisePress = (exercise: ExerciseI) => {
    navigation.navigate('ExerciseDetailScreen', { exercise })
  }

  return (
    <Box
      flex="1"
      backgroundColor='primary.900'
      padding="5"
    >
      <Box
        backgroundColor='primary.600'
        borderRadius="5"
        padding="5"
      >
        <Text
          color="general.900"
          fontWeight='bold'
          fontSize="18"
          marginBottom="2"
        >
          {params.workout.name}
        </Text>
        <Text
          color="general.900"
        >
          Exercises: {params.workout.sets.length}
        </Text>
      </Box>
      <Box
        flex="1"
        justifyContent='center'
        alignItems='center'
        width='100%'
      >
        <FlatList
          width='100%'
          marginTop="5"
          data={params.workout.sets}
          renderItem={({ item }) => (
            <SetComponent key={item.id} set={item} handlePress={handleExercisePress} />
          )}
        />
      </Box>
    </Box>
  );
};

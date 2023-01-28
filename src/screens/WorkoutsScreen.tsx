import React, { useEffect, useState } from 'react';
import { Box, FlatList, Pressable, Text } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
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
    navigation.navigate('WorkoutDetailScreen', { workout })
  }

  return (
    <Box
      display="flex"
      flex="1"
      padding="5"
      backgroundColor="primary.900"
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="5"
      >
        <Text
          color="secondary.900"
          fontWeight="bold"
          fontSize="24"
        >
          Workouts
        </Text>
        <Pressable
          height="10"
          width="40"
          borderColor="secondary.900"
          borderWidth="2"
          borderRadius="10"
          alignItems="center"
          justifyContent="center"
          padding="2"
          onPress={handleAddPress}
        >
          <Text
            color="general.900"
            fontWeight="bold"
          >
            Create Workout
          </Text>
        </Pressable>
      </Box>
      <FlatList
        showsVerticalScrollIndicator={false} 
        data={workouts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleWorkoutPress(item)}>
            <Box
              backgroundColor="primary.600"
              borderRadius="10"
              padding="5"
              marginBottom="4"
            >
              <Text
                fontWeight="bold"
                fontSize="18"
                color="general.900"
              >
                {item.name}
              </Text>
              <Text
                fontWeight="normal"
                fontSize="14"
                color="general.900"
              >
                Exercises: {item.sets.length}
              </Text>
              <Pressable
                backgroundColor="red.600"
                borderRadius="6"
                padding="2"
                alignSelf="flex-end"
                onPress={() => handleRemovePress(item.id)}
              >
                <Text
                  color="general.900"
                  fontWeight="bold"
                >
                  Remove
                </Text>
              </Pressable>
            </Box>
          </Pressable>
        )}
      />
    </Box>
  );
}

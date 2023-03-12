import React, {useEffect} from 'react';
import {Box, Image, Text, Pressable, HStack} from 'native-base';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {HomeScreenParamList} from '../routes/app.routes';

import {useWorkout} from '../hooks/useWorkout';

export function ExerciseDetailScreen({
  navigation,
  route,
}: NativeStackScreenProps<HomeScreenParamList, 'ExerciseDetailScreen'>) {
  const params = route.params;

  const {workouts, fetchWorkouts} = useWorkout();

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleOpenModal = () => {
    navigation.navigate('AddExerciseToWorkoutScreen', params);
  };

  return (
    <>
      <Box safeAreaTop bg="secondary.600" />

      <HStack bg="secondary.600" w="100%" p="5">
        <Pressable
          onPress={() => navigation.goBack()}
          flexDirection="row"
          alignItems="center">
          <Ionicons name="chevron-back" size={24} color="white" />
          <Text fontSize={16} fontWeight="bold" color="general.900">
            Go back
          </Text>
        </Pressable>
      </HStack>

      <Box flex="1" backgroundColor="primary.900" padding="5">
        <Image
          alt={params.exercise.name}
          width="100%"
          height="50%"
          resizeMode="contain"
          marginBottom="5"
          alignSelf="flex-start"
          source={{uri: params.exercise.url}}
        />
        <Box
          alignSelf="flex-start"
          alignItems="flex-start"
          justifyContent="center">
          <Text
            fontSize="24"
            fontWeight="bold"
            color="general.900"
            marginBottom="2">
            {params.exercise.name}
          </Text>
          <Text fontSize="18" color="general.900" marginBottom="2">
            Equipment: {params.exercise.equipment}
          </Text>
          <Text fontSize="18" color="general.900" marginBottom="2">
            Target: {params.exercise.target}
          </Text>
          <Text fontSize="18" color="general.900">
            Body part: {params.exercise.bodyPart}
          </Text>
        </Box>
        {workouts.length ? (
          <Pressable
            onPress={handleOpenModal}
            backgroundColor="primary.700"
            padding="4"
            marginTop="5"
            borderRadius="8"
            width="100%"
            alignItems="center"
            justifyContent="center"
            borderWidth="2"
            borderColor="secondary.900">
            <Text color="white" fontWeight="bold" fontSize="16">
              Add to workout list
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => navigation.navigate('WorkoutsScreen')}
            backgroundColor="primary.700"
            padding="4"
            marginTop="5"
            borderRadius="8"
            width="100%"
            alignItems="center"
            justifyContent="center"
            borderWidth="2"
            borderColor="secondary.900">
            <Text color="white" fontWeight="bold" fontSize="16">
              You should create a workout
            </Text>
          </Pressable>
        )}
      </Box>
    </>
  );
}

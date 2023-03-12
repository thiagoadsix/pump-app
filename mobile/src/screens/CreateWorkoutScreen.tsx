import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Box, HStack, Input, Pressable, Text} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {api} from '../services/axios';
import {HomeScreenParamList} from '../routes/app.routes';
import {useAuth} from '../hooks/useAuth';
import {useWorkout} from '../hooks/useWorkout';

export function CreateWorkoutScreen({
  navigation,
}: NativeStackScreenProps<HomeScreenParamList, 'CreateWorkoutScreen'>) {
  const [workoutName, setWorkoutName] = useState<string>('');
  const {user} = useAuth();
  const {setWorkouts} = useWorkout();

  const handleCreatePress = async () => {
    await api.post('local/workouts', {name: workoutName, userId: user.id});
    const workouts = await api.get(`local/workouts/user/${user.id}`);
    setWorkouts(workouts.data);
    navigation.navigate('WorkoutsScreen');
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

      <Box display="flex" flex={1} padding="5" backgroundColor="primary.900">
        <Input
          value={workoutName}
          onChangeText={setWorkoutName}
          autoFocus={true}
          editable={true}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Workout Name"
          borderColor="secondary.900"
          borderWidth="2"
          variant="filled"
          color="general.900"
          _focus={{color: 'general.900'}}
        />
        <Pressable
          borderColor="secondary.900"
          borderWidth="2"
          borderRadius="10"
          alignItems="center"
          justifyContent="center"
          padding="2"
          onPress={handleCreatePress}
          marginTop="4">
          <Text color="general.900" fontWeight="bold">
            Create Workout
          </Text>
        </Pressable>
      </Box>
    </>
  );
}

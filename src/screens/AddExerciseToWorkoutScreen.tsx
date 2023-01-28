import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAvoidingView, Image, Text, Box, Input, Pressable, FlatList, Radio } from 'native-base'
import { RootStackParamList } from '../../navigation';
import { fetchPost, fetchSingle } from '../api/axios';
import { color } from 'native-base/lib/typescript/theme/styled-system';

interface Workout {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  sets: any[];
}

export function AddExerciseToWorkoutScreen ({ navigation, route }: NativeStackScreenProps<RootStackParamList, 'AddExerciseToWorkoutScreen'>) {
  const userIdMocked = '4cb4866b-a240-419a-b4f2-3d762d29eb17'
  const { exercise } = route.params;
  
  const [workoutId, setWorkoutId] = useState<string>();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [repetitions, setRepetitions] = useState<number>(0);
  const [series, setSeries] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);

  useEffect(() => {
    fetchSingle(`/local/workouts/user/${userIdMocked}`, 'get')
      .then(result => {
        setWorkouts(result);
      });
  }, [])

  const handleAddExerciseToWorkoutList = async () => {
    await fetchPost(`local/workouts/${workoutId}/user/${userIdMocked}/exercise`, 'post', { sets: [{ id: exercise.id, repetitions, series, weight }] })
    navigation.navigate('BodyPartScreen')
  }

  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
      <KeyboardAvoidingView
        behavior="padding"
        flex="1"
        backgroundColor='primary.900'
        padding="5"
        h={{
          base: "400px",
          lg: "auto"
        }}
      >
        <Image
          width='100%'
          height='35%'
          resizeMode='contain'
          alignSelf='flex-start'
          shadow="5"
          source={{ uri: exercise.url }} />
        <Text
          fontSize="24"
          fontWeight='bold'
          color='general.900'
          marginY="2"
        >{exercise.name}</Text>
        <Box
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Input
            color="general.900"
            flex="1"
            padding="2"
            margin="2"
            borderWidth="2"
            borderColor='secondary.600'
            borderRadius="5"
            _focus={{ borderColor: "secondary.900" }}
            placeholder="Repetitions"
            keyboardType="numeric"
            onChangeText={text => setRepetitions(Number(text))}
          />
          <Input
            color="general.900"
            flex="1"
            padding="2"
            margin="2"
            borderWidth="2"
            borderColor='secondary.600'
            _focus={{ borderColor: "secondary.900" }}
            borderRadius="5"
            placeholder="Series"
            keyboardType="numeric"
            onChangeText={text => setSeries(Number(text))}
          />
          <Input
            color="general.900"
            flex="1"
            padding="2"
            margin="2"
            borderWidth="2"
            borderColor='secondary.600'
            _focus={{ borderColor: "secondary.900" }}
            borderRadius="5"
            placeholder="Weight"
            keyboardType="numeric"
            onChangeText={text => setWeight(Number(text))}
          />
        </Box>
        <Text
          fontSize="18"
          color="general.900"
          fontWeight="medium"
          marginY="4"
        >Workouts</Text>
        <FlatList
          data={workouts}
          renderItem={({ item }) => {
            return (
              <Radio.Group
                name="Workout"
                value={workoutId}
                onChange={nextValue => {
                  setWorkoutId(nextValue);
                }}>
                <Radio
                  value={item.id}
                  marginY={1}
                  size="sm"
                  _checked={{
                    backgroundColor: "secondary.900"
                  }}
                >
                  <Text color="general.900">
                    {item.name}
                  </Text>
                </Radio>
              </Radio.Group>
            )
          }}
          maxHeight="25%"
        />
        <Pressable
          onPress={handleAddExerciseToWorkoutList}
          backgroundColor='primary.700'
          padding="4"
          marginTop="5"
          borderRadius="8"
          width='100%'
          alignItems='center'
          justifyContent='center'
          borderWidth="2"
          borderColor="secondary.900"
        >
          <Text
            color='white'
            fontWeight='bold'
            fontSize="16">Add</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

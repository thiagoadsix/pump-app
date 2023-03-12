/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Exercise, Set, Workout} from '../contracts/interfaces';

import {HomeScreen} from '../screens/HomeScreen';
import {BodyPartScreen} from '../screens/BodyPartScreen';
import {WorkoutsScreen} from '../screens/WorkoutsScreen';
import {WorkoutDetailScreen} from '../screens/WorkoutDetailScreen';
import {CreateWorkoutScreen} from '../screens/CreateWorkoutScreen';
import {AddExerciseToWorkoutScreen} from '../screens/AddExerciseToWorkoutScreen';
import {ExerciseDetailScreen} from '../screens/ExerciseDetailScreen';
import {WorkoutExerciseDetailScreen} from '../screens/WorkoutExerciseDetailScreen';

export interface SetExercise extends Set {
  exercise: Exercise;
}

export interface WorkoutSetExercise extends Workout {
  sets: SetExercise[];
}

export type HomeScreenParamList = {
  HomeScreen: undefined;
  BodyPartScreen: undefined;
  WorkoutDetailScreen: {
    workout: WorkoutSetExercise;
  };
  ExerciseDetailScreen: {
    exercise: Exercise;
  };
  AddExerciseToWorkoutScreen: {
    exercise: Exercise;
  };
  WorkoutsScreen: undefined;
  CreateWorkoutScreen: undefined;
  WorkoutExerciseDetailScreen: {
    set: SetExercise;
    exercise: Exercise;
  };
};

export type WorkoutsScreenParamList = {
  WorkoutsScreen: undefined;
  CreateWorkoutScreen: undefined;
};

const HomeStack = createStackNavigator<HomeScreenParamList>();
const Tab = createBottomTabNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="HomeScreen">
    <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    <HomeStack.Screen name="BodyPartScreen" component={BodyPartScreen} />
    <HomeStack.Screen
      name="WorkoutDetailScreen"
      component={WorkoutDetailScreen}
    />
    <HomeStack.Screen
      name="ExerciseDetailScreen"
      component={ExerciseDetailScreen}
    />
    <HomeStack.Screen
      name="AddExerciseToWorkoutScreen"
      component={AddExerciseToWorkoutScreen}
    />
    <HomeStack.Screen
      name="CreateWorkoutScreen"
      component={CreateWorkoutScreen}
    />
    <HomeStack.Screen name="WorkoutsScreen" component={WorkoutsScreen} />
    <HomeStack.Screen
      name="WorkoutExerciseDetailScreen"
      component={WorkoutExerciseDetailScreen}
    />
  </HomeStack.Navigator>
);
export const AppRoutes: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused}) => {
          let iconName:
            | 'home'
            | 'home-outline'
            | 'barbell'
            | 'barbell-outline' = 'home';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Workouts') {
            iconName = focused ? 'barbell' : 'barbell-outline';
          }

          return <Ionicons name={iconName} size={24} color="#00E9D6" />;
        },
        tabBarStyle: {
          backgroundColor: '#212121',
          borderTopColor: '#212121',
        },
        tabBarActiveTintColor: '#00E9D6',
      })}>
      <Tab.Screen
        listeners={({navigation}) => ({
          tabPress: event => {
            event.preventDefault();
            navigation.navigate('HomeScreen');
          },
        })}
        name="Home"
        component={HomeStackScreen}
        options={{tabBarLabel: 'Home'}}
      />
    </Tab.Navigator>
  );
};

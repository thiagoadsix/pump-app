import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BodyPartScreen } from './src/screens/BodyPartScreen';
import { CreateWorkoutScreen } from './src/screens/CreateWorkoutSceen';
import { EquipmentScreen } from './src/screens/EquipmentScreen';

import { ExerciseDetailScreen } from './src/screens/ExerciseDetailScreen';
import { Exercises } from './src/screens/Exercises';
import { Home } from './src/screens/Home';
import { TargetScreen } from './src/screens/TargetScreen';
import { WorkoutsScreen } from './src/screens/WorkoutsScreen';

export type RootStackParamList = {
  Home: undefined,
  Exercises: {
    exercise: any
  };
  ExerciseDetailScreen: {
    exercise: any
  };
  EquipmentScreen: undefined;
  TargetScreen: undefined;
  BodyPartScreen: undefined
  WorkoutsScreen: undefined
  CreateWorkoutScreen: undefined
};


const Stack = createStackNavigator<RootStackParamList>();

export const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
      >
        <Stack.Screen
          name='Home'
          component={Home}
        />
        <Stack.Screen
          name="EquipmentScreen"
          component={EquipmentScreen}
          options={{ title: 'EquipmentScreen' }}
        />
        <Stack.Screen
          name="TargetScreen"
          component={TargetScreen}
          options={{ title: 'TargetScreen' }}
        />
        <Stack.Screen
          name="BodyPartScreen"
          component={BodyPartScreen}
          options={{ title: 'BodyPartScreen' }}
        />
        <Stack.Screen
          name="WorkoutsScreen"
          component={WorkoutsScreen}
          options={{ title: 'WorkoutsScreen' }}
        />
        <Stack.Screen
          name='CreateWorkoutScreen'
          component={CreateWorkoutScreen}
          options={{ title: 'CreateWorkoutScreen' }}
        />
        <Stack.Screen
          name="Exercises"
          component={Exercises}
          options={{ title: 'Exercises' }}
        />
        <Stack.Screen
          name="ExerciseDetailScreen"
          component={ExerciseDetailScreen}
          options={{ title: 'Exercise Detail' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

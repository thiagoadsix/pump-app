import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { BodyPartScreen } from './src/screens/BodyPartScreen'
import { CreateWorkoutScreen } from './src/screens/CreateWorkoutScreen'
import { ExerciseDetailScreen } from './src/screens/ExerciseDetailScreen'
import { ExercisesScreen } from './src/screens/ExercisesScreen'
import { HomeScreen } from './src/screens/HomeScreen'
import { WorkoutDetailScreen } from './src/screens/WorkoutDetailScreen'
import { WorkoutsScreen } from './src/screens/WorkoutsScreen'
import { AddExerciseToWorkoutScreen } from './src/screens/AddExerciseToWorkoutScreen'

export type RootStackParamList = {
  HomeScreen: undefined,
  ExercisesScreen: {
    exercise: any
  };
  ExerciseDetailScreen: {
    exercise: any
  };
  BodyPartScreen: undefined
  WorkoutsScreen: undefined
  CreateWorkoutScreen: undefined
  WorkoutDetailScreen: { workout: {
    id: string
    userId: string
    name: string
    sets: any[]
    createdAt: string
  } }
  AddExerciseToWorkoutScreen: {
    exercise: any
  }
};


const Stack = createStackNavigator<RootStackParamList>()

export const Navigation: React.FC = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName='HomeScreen'
			>
				<Stack.Screen
					name='HomeScreen'
					component={HomeScreen}
				/>
				<Stack.Screen
					name="BodyPartScreen"
					component={BodyPartScreen}
					options={{ title: 'Body Part' }}
				/>
				<Stack.Screen
					name="WorkoutsScreen"
					component={WorkoutsScreen}
					options={{ title: 'Workouts' }}
				/>
				<Stack.Screen
					name="WorkoutDetailScreen"
					component={WorkoutDetailScreen}
					options={{ title: 'Workouts Detail' }}
				/>
				<Stack.Screen
					name='CreateWorkoutScreen'
					component={CreateWorkoutScreen}
					options={{ title: 'Create Workout' }}
				/>
				<Stack.Screen
					name="AddExerciseToWorkoutScreen"
					component={AddExerciseToWorkoutScreen}
					options={{ title: 'Add exercise to workout' }}
				/>
				<Stack.Screen
					name="ExercisesScreen"
					component={ExercisesScreen}
					options={{ title: 'Exercises' }}
				/>
				<Stack.Screen
					name="ExerciseDetailScreen"
					component={ExerciseDetailScreen}
					options={{ title: 'Exercise Detail' }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}

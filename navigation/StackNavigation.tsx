import { createStackNavigator } from '@react-navigation/stack'
import { Exercise, Set, Workout } from '../src/entities'
import { AddExerciseToWorkoutScreen } from '../src/screens/AddExerciseToWorkoutScreen'
import { BodyPartScreen } from '../src/screens/BodyPartScreen'
import { CreateWorkoutScreen } from '../src/screens/CreateWorkoutScreen'
import { ExerciseDetailScreen } from '../src/screens/ExerciseDetailScreen'
import { HomeScreen } from '../src/screens/HomeScreen'
import { SignUpScreen } from '../src/screens/SignUpScreen'
import { SignInScreen } from '../src/screens/SingInScreen'
import { WorkoutDetailScreen } from '../src/screens/WorkoutDetailScreen'
import { WorkoutsScreen } from '../src/screens/WorkoutsScreen'


interface SetExercise extends Set {
	exercise: Exercise
}

export interface WorkoutSetExercise extends Workout {
	sets: SetExercise[]
}

export type RootStackParamList = {
	SignInScreen: undefined,
	SignUpScreen: undefined,
	HomeScreen: undefined,
	ExerciseDetailScreen: {
		exercise: Exercise
	};
	BodyPartScreen: undefined
	WorkoutsScreen: undefined
	CreateWorkoutScreen: undefined
	WorkoutDetailScreen: {
		workout: WorkoutSetExercise
	}
	AddExerciseToWorkoutScreen: {
		exercise: Exercise
	}
};

const Stack = createStackNavigator<RootStackParamList>()

export const HomeNavigation = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='SignInScreen'
				component={SignInScreen}
			/>
			<Stack.Screen
				name='SignUpScreen'
				component={SignUpScreen}
			/>
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
				name="ExerciseDetailScreen"
				component={ExerciseDetailScreen}
				options={{ title: 'Exercise Detail' }}
			/>
			<Stack.Screen
				name="AddExerciseToWorkoutScreen"
				component={AddExerciseToWorkoutScreen}
				options={{ title: 'Add exercise to workout' }}
			/>
		</Stack.Navigator>
	)
}

export const WorkoutNavigation = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='WorkoutsScreen'
				component={WorkoutsScreen}
			/>
		</Stack.Navigator>
	)
}

export const StackNavigation = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='SignUpScreen'
				component={SignUpScreen}
			/>
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
				name="ExerciseDetailScreen"
				component={ExerciseDetailScreen}
				options={{ title: 'Exercise Detail' }}
			/>
		</Stack.Navigator>
	)
}
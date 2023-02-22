import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Octicons } from '@expo/vector-icons'
import { BodyPartScreen } from '../src/screens/BodyPartScreen'
import { CreateWorkoutScreen } from '../src/screens/CreateWorkoutScreen'
import { ExerciseDetailScreen } from '../src/screens/ExerciseDetailScreen'
import { HomeScreen } from '../src/screens/HomeScreen'
import { WorkoutDetailScreen } from '../src/screens/WorkoutDetailScreen'
import { WorkoutsScreen } from '../src/screens/WorkoutsScreen'
import { AddExerciseToWorkoutScreen } from '../src/screens/AddExerciseToWorkoutScreen'
import { Exercise, Set, Workout } from '../src/entities'


interface SetExercise extends Set {
	exercise: Exercise
}

export interface WorkoutSetExercise extends Workout {
	sets: SetExercise[]
}

export type RootStackParamList = {
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

export type RootTabParamList = {
	Home: RootStackParamList
};

const Stack = createStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<RootTabParamList>()

export const Navigation: React.FC = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={() => ({
					headerShown: false,
					tabBarIcon: () => {
						return <Octicons name='home' size={24} color="#00E9D6" />
					},
					tabBarActiveTintColor: '#00E9D6',
					tabBarAllowFontScaling: true,
					tabBarStyle: {
						padding: 8,
						backgroundColor: '#212121',
					}
				})}
			>
				<Tab.Screen
					name='Home'
					component={() => (
						<Stack.Navigator
							initialRouteName='HomeScreen'
							screenOptions={{
								// title: 'PUMP',
								headerStyle: {
									backgroundColor: '#212121',
								},
								headerTintColor: '#fff',
								headerTitleStyle: {
									fontWeight: 'bold',
									fontSize: 34,
								},
							}}
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
								name="ExerciseDetailScreen"
								component={ExerciseDetailScreen}
								options={{ title: 'Exercise Detail' }}
							/>
						</Stack.Navigator>
					)}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	)
}

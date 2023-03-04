import { useEffect, useState } from 'react'
import { Box, FlatList, HStack, Pressable, Text } from 'native-base'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { fetchSingle } from '../api/axios'
import { Ionicons } from '@expo/vector-icons'
import { HomeScreenParamList, WorkoutSetExercise } from '../routes/app.routes'
import { useAuth } from '../hooks/useAuth'

export function WorkoutsScreen({ navigation }: NativeStackScreenProps<HomeScreenParamList, 'WorkoutsScreen'>) {
	const [workouts, setWorkouts] = useState<Array<WorkoutSetExercise>>([])
	const { user } = useAuth()

	useEffect(() => {
		fetchSingle(`local/workouts/user/${user.id}`, 'get')
			.then(result => {
				setWorkouts(result)
			})
	}, [])

	const handleAddPress = () => {
		navigation.navigate('CreateWorkoutScreen')
	}

	const handleRemovePress = (workoutId: string) => {
		fetchSingle(`/local/workouts/${workoutId}/user/${user.id}`, 'delete')
			.then(() => setWorkouts(workouts.filter(workout => workout.id !== workoutId)))
	}

	const handleWorkoutPress = (workout: WorkoutSetExercise) => {
		navigation.navigate('WorkoutDetailScreen', { workout })
	}

	return (
		<>
			<Box safeAreaTop bg="secondary.600" />

			<HStack bg="secondary.600" w="100%" p="5">
				<Pressable onPress={() => navigation.goBack()} flexDirection="row" alignItems="center" >
					<Ionicons name='chevron-back' size={24} color="white"/>
					<Text fontSize={16} fontWeight="bold" color="general.900">Go back</Text>
				</Pressable>
			</HStack>

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
		</>
	)
}

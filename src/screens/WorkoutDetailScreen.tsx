import { Ionicons } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box, FlatList, HStack, Pressable, Text } from 'native-base'

import { SetComponent } from '../components/SetComponent'

import { Exercise } from '../entities'
import { HomeScreenParamList, SetExercise } from '../routes/app.routes'

export function WorkoutDetailScreen({ navigation, route }: NativeStackScreenProps<HomeScreenParamList, 'WorkoutDetailScreen'>) {
	const params = route.params

	const handleExercisePress = (set: SetExercise, exercise: Exercise) => {
		navigation.navigate('WorkoutExerciseDetailScreen', { set, exercise })
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
				flex="1"
				backgroundColor='primary.900'
				padding="5"
			>
				<Box
					backgroundColor='primary.600'
					borderRadius="5"
					padding="5"
					flexDirection="row"
					justifyContent="space-between"
				>
					<Box>
						<Text
							color="general.900"
							fontWeight='bold'
							fontSize="18"
						>
							{params?.workout.name}
						</Text>
						<Text
							color="general.900"
						>
          Exercises: {params?.workout.sets.length}
						</Text>
					</Box>
					<Pressable
						onPress={() => navigation.navigate('BodyPartScreen')}
						flexDirection="row"
						alignItems="center"
						borderWidth="2"
						borderColor="secondary.900"
						borderRadius="10"
						padding="2"
						backgroundColor="secondary.600"
					>
						<Ionicons name='add' size={20} color="white"/>
						<Text fontSize={12} fontWeight="bold" color="general.900">Add exercise</Text>
					</Pressable>
				</Box>
				<Box
					flex="1"
					justifyContent='center'
					alignItems='center'
					width='100%'
				>
					<FlatList
						width='100%'
						marginTop="5"
						data={params?.workout.sets}
						renderItem={({ item }) => (
							<SetComponent key={item.id}  set={item} handlePress={() => handleExercisePress(item, item.exercise)} />
						)}
					/>
				</Box>
			</Box>
		</>
	)
}

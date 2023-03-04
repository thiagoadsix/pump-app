import { Ionicons } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box, HStack, Image, Pressable, Text } from 'native-base'
import { HomeScreenParamList } from '../routes/app.routes'

export function WorkoutExerciseDetailScreen ({ navigation, route }: NativeStackScreenProps<HomeScreenParamList, 'WorkoutExerciseDetailScreen'>) {
	const params = route.params

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
				backgroundColor="primary.900"
				padding="5"
			>
				<Image
					alt={params.exercise.name}
					width='100%'
					height='50%'
					resizeMode='contain'
					marginBottom="5"
					alignSelf='flex-start'
					source={{ uri: params.exercise.url }}
				/>
				<Box
					alignSelf='flex-start'
					alignItems='flex-start'
					justifyContent='center'
				>
					<Text
						fontSize="24"
						fontWeight='bold'
						color='general.900'
						marginBottom="2"
					>{params.exercise.name}</Text>
					<Text
						fontSize="18"
						color='general.900'
						marginBottom="2"
					>Repetitions: {params.set.repetitions}</Text>
					<Text
						fontSize="18"
						color='general.900'
						marginBottom="2"
					>Series: {params.set.series}</Text>
					<Text
						fontSize="18"
						color='general.900'
					>Weight: {params.set.weight}kg</Text>
				</Box>
			</Box>
		</>
	)
}
import { Box, Image, Text, Pressable } from 'native-base'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootStackParamList } from '../../navigation'

export function ExerciseDetailScreen({ navigation, route }: NativeStackScreenProps<RootStackParamList, 'ExerciseDetailScreen'>) {
	const params = route.params

	const handleOpenModal = () => {
		navigation.navigate('AddExerciseToWorkoutScreen', params)
	}

	return (
		<Box
			flex="1"
			backgroundColor="primary.900"
			padding="5"
		>
			<Image
				alt={params.exercise.name}
				borderRadius="30"
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
				>Equipment: {params.exercise.equipment}</Text>
				<Text
					fontSize="18"
					color='general.900'
					marginBottom="2"
				>Target: {params.exercise.target}</Text>
				<Text
					fontSize="18"
					color='general.900'
				>Body part: {params.exercise.bodyPart}</Text>
			</Box>
			<Pressable
				onPress={handleOpenModal}
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
					fontSize="16"
				>Add to workout list</Text>
			</Pressable>
		</Box>
	)
}

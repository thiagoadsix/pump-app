import { useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { Pressable, Image, Box, Text, Skeleton } from 'native-base'
import { ExerciseI } from '../interfaces/ExerciseI'

interface Props {
  exercise: ExerciseI;
  handlePress: (exercise: any) => void;
}

export const ExerciseComponent: React.FC<Props> = ({ exercise, handlePress }) => {
	const [imageLoaded, setImageLoaded] = useState(false)

	return (
		<Pressable
			flexDirection='row'
			alignItems='center'
			backgroundColor='primary.600'
			padding="15"
			marginBottom="15"
			borderRadius="5"
			onPress={() => handlePress(exercise)}
		>
			<Image
				alt={exercise.name}
				width="90"
				height="90"
				borderRadius="5"
				marginRight="15"
				source={{ uri: exercise.url }}
				onLoad={() => setImageLoaded(true)}
			/>
			{
				!imageLoaded && (
					<Box
						flexDirection='row'
						alignItems='center'
						backgroundColor='primary.600'
						padding="15"
						marginBottom="15"
						borderRadius="5">
						<Box
							display="flex"
							flex={1}
						>
							<Skeleton.Text fontSize="16" lines={4} width="65%"/>
						</Box>
					</Box>
				)
			}
			{
				imageLoaded && (
					<Box
						display="flex"
						flex={1}
					>
						<Text
							fontSize="16"
							fontWeight="bold"
							color="general.900"
						>{exercise.name}</Text>
						<Text
							fontSize="14"
							color="general.900"
							marginTop="1"
						>Equipment: {exercise.equipment}</Text>
						<Text
							fontSize="14"
							color="general.900"
							marginTop="1"
						>Target: {exercise.target}</Text>
						<Text
							fontSize="14"
							color="general.900"
							marginTop="1"
						>Body part: {exercise.bodyPart}</Text>
					</Box>
				)
			}
		</Pressable>
	)
}

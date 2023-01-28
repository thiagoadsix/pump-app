import { useState } from 'react'
import { Pressable, Image, Text, Box, Skeleton } from 'native-base'
import { Exercise, Set } from '../entities'

interface SetProps extends Set {
	exercise: Exercise
}

interface SetComponentProps {
  set: SetProps;
  handlePress: (exercise: Exercise) => void;
}

export const SetComponent	: React.FC<SetComponentProps> = ({ set, handlePress }) => {
	const [imageLoaded, setImageLoaded] = useState(false)

	return (
		<Pressable
			flexDirection='row'
			alignItems='center'
			backgroundColor='primary.600'
			padding="15"
			marginBottom="4"
			borderRadius="5"
			onPress={() => handlePress(set.exercise)}
		>
			<Image
				alt={set.exercise.name}
				width="90"
				height="90"
				borderRadius="5"
				marginRight="4"
				source={{ uri: set.exercise.url }}
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
						display='flex'
						flex="1"
					>
						<Text
							fontSize="18"
							fontWeight='bold'
							color='general.900'
						>
							{set.exercise.name}
						</Text>
						<Text
							fontSize="16"
							color='general.900'
						>
              Repetitions: {set.repetitions}x
						</Text>
						<Text

							fontSize="16"
							color='general.900'
						>
              Weight: {set.weight}kg
						</Text>
						<Text
							fontSize="16"
							color='general.900'
						>
              Series: {set.series}x
						</Text>
					</Box>
				)
			}
		</Pressable>
	)
}

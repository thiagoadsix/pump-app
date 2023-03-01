import { useEffect, useState } from 'react'
import { Box, FlatList, HStack, Pressable, Text } from 'native-base'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Ionicons } from '@expo/vector-icons'

import { fetchSingle } from '../api/axios'
import { RootStackParamList } from '../../navigation'

import { ExerciseComponent } from '../components/ExerciseComponent'
import { WhichTypeListComponent } from '../components/WhichTypeListComponent'
import { Exercise } from '../entities'

export function BodyPartScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'BodyPartScreen'>) {
	const [selected, setSelected] = useState<string>('back')
	const [exercises, setExercises] = useState<Array<Exercise>>([])

	useEffect(() => {
		fetchSingle(`local/exercises/body-part/${selected}`, 'get')
			.then(result => {
				setExercises(result)
			})
	}, [selected])

	const handlePress = (exercise: Exercise) => {
		navigation.navigate('ExerciseDetailScreen', { exercise })
	}

	const bodyParts = ['back', 'chest', 'lower arms', 'lower legs', 'neck', 'shoulders', 'upper arms', 'upper legs', 'waist'
	]

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
				backgroundColor="primary.900"
				padding="5"
			>
				<Box
					alignItems="center"
					justifyContent="center"
				>
					<WhichTypeListComponent
						data={bodyParts}
						selected={selected}
						setSelected={setSelected}
						horizontal
					/>
				</Box>
				<FlatList
					showsVerticalScrollIndicator={false}
					data={exercises}
					keyExtractor={item => item.id}
					renderItem={({ item }) => (
						<ExerciseComponent key={item.id} exercise={item} handlePress={handlePress} />
					)}
					marginTop="5"
					width="100%"
					maxWidth={400}
				/>
			</Box>
		</>

	)
}

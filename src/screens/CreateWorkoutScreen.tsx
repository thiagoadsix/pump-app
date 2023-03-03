import { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box, HStack, Input, Pressable, Text } from 'native-base'


import { fetchPost } from '../api/axios'
import { Ionicons } from '@expo/vector-icons'
import { HomeScreenParamList } from '../routes/app.routes'

export function CreateWorkoutScreen({ navigation }: NativeStackScreenProps<HomeScreenParamList, 'CreateWorkoutScreen'>) {
	const userIdMocked = '4cb4866b-a240-419a-b4f2-3d762d29eb17'

	const [workoutName, setWorkoutName] = useState<string>('')

	const handleCreatePress = () => {
		fetchPost('local/workouts', 'post', { name: workoutName, userId: userIdMocked }).then(() => {
			navigation.navigate('WorkoutsScreen')
		})
	}

	return (
		<>
			<Box safeAreaTop bg="secondary.600" />

			<HStack bg="secondary.600" w="100%" p="5">
				<Pressable onPress={() => navigation.goBack()} flexDirection="row" alignItems="center" >
					<Ionicons name='chevron-back' size={24} color="white" />
					<Text fontSize={16} fontWeight="bold" color="general.900">Go back</Text>
				</Pressable>
			</HStack>

			<Box
				display="flex"
				flex={1}
				padding="5"
				backgroundColor="primary.900"
			>
				<Input
					value={workoutName}
					onChangeText={setWorkoutName}
					autoFocus={true}
					editable={true}
					autoComplete="off"
					autoCapitalize="none"
					autoCorrect={false}
					placeholder="Workout Name"
					borderColor="secondary.900"
					borderWidth="2"
					variant="filled"
					color="general.900"
					_focus={{ color: 'general.900' }}
				/>
				<Pressable
					borderColor="secondary.900"
					borderWidth="2"
					borderRadius="10"
					alignItems="center"
					justifyContent="center"
					padding="2"
					onPress={handleCreatePress}
					marginTop="4"
				>
					<Text
						color="general.900"
						fontWeight="bold"
					>
						Create Workout
					</Text>
				</Pressable>
			</Box>
		</>
	)
}

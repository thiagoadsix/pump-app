import { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box, Input, Pressable, Text } from 'native-base'

import { RootStackParamList } from '../../navigation'
import { fetchPost } from '../api/axios'

export function CreateWorkoutScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'CreateWorkoutScreen'>) {
	const userIdMocked = '4cb4866b-a240-419a-b4f2-3d762d29eb17'

	const [workoutName, setWorkoutName] = useState<string>('')

	const handleCreatePress = () => {
		fetchPost('local/workouts', 'post', { name: workoutName, userId: userIdMocked }).then(() => {
			navigation.navigate('BodyPartScreen')
		})
	}

	return (
		<>
			<Box safeAreaTop bg="secondary.600" />

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
					_focus={{color: 'general.900'}}
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

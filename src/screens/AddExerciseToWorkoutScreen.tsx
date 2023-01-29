import { useEffect, useState } from 'react'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import { KeyboardAvoidingView, Image, Text, Input, Pressable, FlatList, Radio, FormControl, Stack, Icon, Modal, Button, Box } from 'native-base'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FontAwesome } from '@expo/vector-icons'
import { RootStackParamList } from '../../navigation'
import { fetchPost, fetchSingle } from '../api/axios'
import { Workout } from '../entities'

export function AddExerciseToWorkoutScreen({ navigation, route }: NativeStackScreenProps<RootStackParamList, 'AddExerciseToWorkoutScreen'>) {
	const userIdMocked = '4cb4866b-a240-419a-b4f2-3d762d29eb17'
	const { exercise } = route.params

	const [workoutId, setWorkoutId] = useState<string>()
	const [workouts, setWorkouts] = useState<Workout[]>([])
	const [repetitions, setRepetitions] = useState<number>(0)
	const [series, setSeries] = useState<number>(0)
	const [weight, setWeight] = useState<number>(0)
	const [showWorkouts, setShowWorkouts] = useState<boolean>(false)
	const [showModal, setShowModal] = useState<boolean>(false)

	useEffect(() => {
		fetchSingle(`/local/workouts/user/${userIdMocked}`, 'get')
			.then(result => {
				setWorkouts(result)
			})
	}, [])

	const handleAddExerciseToWorkoutList = async () => {
		await fetchPost(`local/workouts/${workoutId}/user/${userIdMocked}/exercise`, 'post', { sets: [{ id: exercise.id, repetitions, series, weight: exercise.equipment !== 'body weight' ? weight : 0 }] })
		setShowModal(false)
		navigation.navigate('BodyPartScreen')
	}

	const handleShowModalToAddExerciseToWorkoutList = async () => {
		setShowModal(true)
	}

	const handleShowWorkouts = async () => {
		setShowWorkouts(true)
	}

	const handleGoBackToForm = async () => {
		setShowWorkouts(false)
	}

	return (
		<TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
			<KeyboardAvoidingView
				behavior="position"
				flex="1"
				backgroundColor='primary.900'
				padding="5"
				h={{
					base: '400px',
					lg: 'auto'
				}}
			>
				<Image
					alt={exercise.name}
					width='100%'
					height='35%'
					resizeMode='contain'
					alignSelf='flex-start'
					shadow="5"
					source={{ uri: exercise.url }} />
				<Text
					fontSize="24"
					fontWeight='bold'
					color='general.900'
					marginY="2"
				>{exercise.name}</Text>
				{
					!showWorkouts && (
						<FormControl isRequired >
							<Stack marginBottom="4">
								<FormControl.Label>
									<Text bold color="general.900" fontSize="16">Repetitions</Text>
								</FormControl.Label>
								<Input
									color="general.900"
									borderWidth="2"
									borderColor='secondary.600'
									_focus={{ borderColor: 'secondary.900' }}
									placeholder="Ex.: 12"
									keyboardType='number-pad'
									value={String(repetitions)}
									onChangeText={text => setRepetitions(Number(text))} />
							</Stack>
							<Stack marginBottom="4">
								<FormControl.Label>
									<Text bold color="general.900" fontSize="16">Series</Text>
								</FormControl.Label>
								<Input
									color="general.900"
									borderWidth="2"
									borderColor='secondary.600'
									_focus={{ borderColor: 'secondary.900' }}
									placeholder="Ex.: 3"
									keyboardType='number-pad'
									value={String(series)}
									onChangeText={text => setSeries(Number(text))} />
							</Stack>
							{
								exercise.equipment !== 'body weight' && (
									<Stack marginBottom="4">
										<FormControl.Label>
											<Text bold color="general.900" fontSize="16">Weight</Text>
										</FormControl.Label>
										<Input
											color="general.900"
											borderWidth="2"
											borderColor='secondary.600'
											_focus={{ borderColor: 'secondary.900' }}
											placeholder="Ex.: 10"
											keyboardType='number-pad'
											value={String(weight)}
											onChangeText={text => setWeight(Number(text))} />
									</Stack>
								)
							}
						</FormControl>
					)
				}

				{
					showWorkouts && (
						<Box>
							<Text
								fontSize="18"
								color="secondary.900"
								fontWeight="bold"
								marginY="4"
							>Workouts</Text>
							<FlatList
								height="20%"
								data={workouts}
								showsVerticalScrollIndicator={true}
								scrollEnabled={true}
								indicatorStyle='white'
								renderItem={({ item }) => {
									return (
										<Radio.Group
											name="Workout"
											value={workoutId}
											onChange={nextValue => {
												setWorkoutId(nextValue)
											}}>
											<Radio
												value={item.id}
												marginY={2}
												size="sm"
												_checked={{
													backgroundColor: 'secondary.900'
												}}
											>
												<Text color="general.900" fontSize="18">
													{item.name}
												</Text>
											</Radio>
										</Radio.Group>
									)
								}}
							/>
						</Box>
					)
				}

				{
					!showWorkouts && (
						<Stack>
							<Pressable
								onPress={handleShowWorkouts}
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
									fontSize="16">Choose workout playlist</Text>
							</Pressable></Stack>
					)
				}

				{
					showWorkouts && (
						<Stack>
							<Pressable
								onPress={workoutId ? handleShowModalToAddExerciseToWorkoutList : handleShowWorkouts}
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
									fontSize="16">{workoutId ? `Add to ${workouts.filter(workout => workout.id === workoutId).shift()?.name}` : 'Add'}</Text>
							</Pressable>
							<Pressable
								onPress={handleGoBackToForm}
								backgroundColor='primary.700'
								padding="4"
								marginTop="5"
								borderRadius="8"
								width='100%'
								alignItems='center'
								justifyContent='center'
								borderWidth="2"
								borderColor="secondary.900"
								flexDirection="row"
							>
								<Icon as={FontAwesome} name="chevron-left" marginRight="2" />
								<Text
									color='white'
									fontWeight='bold'
									fontSize="16">Go back to form</Text>
							</Pressable>
						</Stack>
					)
				}

				<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
					<Modal.Content maxWidth="400px">
						<Modal.Header
							borderBottomWidth={2}
							borderBottomColor="secondary.900"
							backgroundColor="primary.600"
							justifyItems="center"
							alignItems="center">
							<Text bold color="general.900">Successful</Text></Modal.Header>
						<Modal.Body backgroundColor="primary.600" alignItems="center" justifyContent="center">
							<Icon as={FontAwesome} name="check" size={20} color="secondary.600" />
							<Text fontSize="14" textAlign="center" color="general.900">Exercise and details added with successful. You'll will be redirected to Body Part screen.</Text>
						</Modal.Body>
						<Modal.Footer borderTopWidth={2} borderTopColor="secondary.900" backgroundColor="primary.600" alignItems="center" justifyContent="center">
							<Button.Group>
								<Button
									backgroundColor='primary.700'
									padding="4"
									marginTop="5"
									borderRadius="8"
									width='100%'
									alignItems='center'
									justifyContent='center'
									borderWidth="2"
									borderColor="secondary.900"
									flexDirection="row" onPress={handleAddExerciseToWorkoutList}>
									Ok
								</Button>
							</Button.Group>
						</Modal.Footer>
					</Modal.Content>
				</Modal>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	)
}

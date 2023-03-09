import { useEffect, useState } from 'react'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import { ScrollView, KeyboardAvoidingView, Image, Text, Input, Pressable, FlatList, Radio, FormControl, Stack, Icon, Modal, Button, Box, HStack, View } from 'native-base'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Controller, useForm } from 'react-hook-form'

import { api } from '../api/axios'
import { Workout } from '../entities'
import { HomeScreenParamList } from '../routes/app.routes'
import { useAuth } from '../hooks/useAuth'

export function AddExerciseToWorkoutScreen({ navigation, route }: NativeStackScreenProps<HomeScreenParamList, 'AddExerciseToWorkoutScreen'>) {
	const { exercise } = route.params

	const [workouts, setWorkouts] = useState<Workout[]>([])
	const [showWorkouts, setShowWorkouts] = useState<boolean>(false)
	const [showModal, setShowModal] = useState<boolean>(false)
	const { user } = useAuth()

	const { control, handleSubmit, formState: { errors }, getValues } = useForm()

	const { repetitions, series, weight, workoutId } = getValues()

	useEffect(() => {
		api.get(`/local/workouts/user/${user.id}`)
			.then(result => {
				setWorkouts(result.data)
			}).catch(error => {throw error})
	}, [user.id])

	const handleAddExerciseToWorkoutList = async () => {
		await api.post(`local/workouts/${workoutId}/user/${user.id}/exercise`, { sets: [{ id: exercise.id, repetitions, series, weight: exercise.equipment !== 'body weight' ? weight : 0 }] })
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
		<>
			<Box safeAreaTop bg="secondary.600" zIndex={9999} />

			<HStack bg="secondary.600" w="100%" p="5" zIndex={9999}>
				<Pressable onPress={() => navigation.goBack()} flexDirection="row" alignItems="center" >
					<Ionicons name='chevron-back' size={24} color="white" />
					<Text fontSize={16} fontWeight="bold" color="general.900">Go back</Text>
				</Pressable>
			</HStack>

			<TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
				<KeyboardAvoidingView
					behavior="height"
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

					{showWorkouts ? (
						<>
							<FormControl isRequired isInvalid={'workoutId' in errors}>
								<FormControl.Label>Workouts</FormControl.Label>
						
								<Controller
									control={control}
									render={({ field: { onChange } }) => (
										<FlatList
											height="20%"
											data={workouts}
											showsVerticalScrollIndicator={true}
											scrollEnabled={true}
											indicatorStyle='white'
											renderItem={({ item }) => {
												return (
													<>
														<Radio.Group
															name="workoutId"
															onChange={(val) => onChange(val)}>
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
														<FormControl.ErrorMessage>
															{errors.workoutId?.message}
														</FormControl.ErrorMessage>
													</>
												)
											}}
										/>
									)}
									name="workoutId"
									rules={{ required: 'Workout is required' }}
								/>
							</FormControl>

							<Stack>
								<Pressable
									onPress={handleSubmit(handleShowModalToAddExerciseToWorkoutList)}
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
										fontSize="16">Add</Text>
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
						</>
					) : (
						<View flex="1">
							<ScrollView>
								<FormControl isRequired isInvalid={'repetitions' in errors} marginBottom="2">
									<FormControl.Label>
										<Text bold color="general.900" fontSize="16">Repetitions</Text>
									</FormControl.Label>
									<Controller
										control={control}
										render={({ field: { onChange, onBlur, value } }) => (
											<Input
												onBlur={onBlur}
												color="general.900"
												borderWidth="2"
												borderColor='secondary.600'
												_focus={{ borderColor: 'secondary.900' }}
												placeholder="Ex.: 12"
												keyboardType='number-pad'
												onChangeText={(val) => onChange(val)}
												value={value}
											/>
										)}
										name="repetitions"
										rules={{ required: 'Field is required', minLength: 1 }}
									/>
									<FormControl.ErrorMessage>
										{errors.repetitions?.message}
									</FormControl.ErrorMessage>
								</FormControl>

								<FormControl isRequired isInvalid={'series' in errors} marginBottom="2">
									<FormControl.Label>
										<Text bold color="general.900" fontSize="16">Series</Text>
									</FormControl.Label>
									<Controller
										control={control}
										render={({ field: { onChange, onBlur, value } }) => (
											<Input
												onBlur={onBlur}
												color="general.900"
												borderWidth="2"
												borderColor='secondary.600'
												_focus={{ borderColor: 'secondary.900' }}
												placeholder="Ex.: 3"
												keyboardType='number-pad'
												onChangeText={(val) => onChange(val)}
												value={value}
											/>
										)}
										name="series"
										rules={{ required: 'Field is required' }}
									/>
									<FormControl.ErrorMessage>
										{errors.series?.message}
									</FormControl.ErrorMessage>
								</FormControl>

								<FormControl isRequired isInvalid={'weight' in errors} marginBottom="2">
									<FormControl.Label>
										<Text bold color="general.900" fontSize="16">Weight</Text>
									</FormControl.Label>
									<Controller
										control={control}
										render={({ field: { onChange, onBlur, value } }) => (
											<Input
												onBlur={onBlur}
												color="general.900"
												borderWidth="2"
												borderColor='secondary.600'
												_focus={{ borderColor: 'secondary.900' }}
												placeholder="Ex.: 40"
												keyboardType='number-pad'
												onChangeText={(val) => onChange(val)}
												value={value}
											/>
										)}
										name="weight"
										rules={{ required: 'Field is required' }}
									/>
									<FormControl.ErrorMessage>
										{errors.weight?.message}
									</FormControl.ErrorMessage>
								</FormControl>

								<Pressable
									onPress={handleSubmit(handleShowWorkouts)}
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
								</Pressable>
							</ScrollView>
						</View>
					)}

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
		</>
	)
}

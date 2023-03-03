import React, { useState } from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MaterialIcons } from '@expo/vector-icons'
import { Box, Input, Button, VStack, Icon, Center, Heading, FormControl, Pressable, KeyboardAvoidingView, useToast, HStack, Text, Link } from 'native-base'
import { useAuth } from '../hooks/useAuth'
import { AppError } from '../utils/AppError'
import { AuthStackParamList } from '../routes/auth.routes'

type Props = NativeStackScreenProps<AuthStackParamList, 'SignInScreen'>;

export function SignInScreen({ navigation }: Props) {
	const [isLoading, setIsLoading] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(true)

	const { signIn } = useAuth()
	const toast = useToast()

	const handleSignIn = async () => {
		try {
			setIsLoading(true)

			signIn(email, password)
		} catch (error) {
			const isAppError = error instanceof AppError
			const title = isAppError ? error.message : 'Try again later.'

			setIsLoading(false)

			toast.show({
				title,
				placement: 'bottom',
				bgColor: 'red.500'
			})
		}
	}

	const handleSignUp = async () => {
		navigation.navigate('SignUpScreen')
	}

	const handleChangeEmail = (email: string) => setEmail(email)

	const handleChangePassword = (password: string) => setPassword(password)

	return (
		<TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
			<Center flex="1" w="100%" backgroundColor="#212121">
				<Box safeArea p="2" w="90%" maxW="290" py="8">
					<Heading size="3xl" color="general.900" fontWeight="semibold">
						Sign In
					</Heading>
					<KeyboardAvoidingView
						behavior="position"
						backgroundColor='primary.900'
					>
						<VStack space={3} mt="5">
							<FormControl>
								<FormControl.Label>Email</FormControl.Label>
								<Input
									value={email}
									onChangeText={handleChangeEmail}
									autoCorrect={false}
									autoCapitalize="none"
									autoComplete="email"
									color="general.900"
									borderColor="secondary.600"
									_focus={{ borderColor: 'secondary.900' }}
									keyboardType="email-address"
									returnKeyType='next'
								/>
							</FormControl>
							<FormControl>
								<FormControl.Label>Password</FormControl.Label>
								<Input
									value={password}
									onChangeText={handleChangePassword}
									autoCorrect={false}
									autoCapitalize="none"
									color="general.900"
									autoComplete="password"
									type={showPassword ? 'password' : 'text'}
									borderColor="secondary.600"
									_focus={{ borderColor: 'secondary.900' }}
									returnKeyType="send"
									InputRightElement={<Pressable onPress={() => setShowPassword(!showPassword)}>
										<Icon as={<MaterialIcons name={showPassword ? 'visibility' : 'visibility-off'} />} size={5} mr="2" color="muted.400" />
									</Pressable>}
								/>
							</FormControl>
							<Button
								onPress={handleSignIn}
								mt="2"
								backgroundColor="secondary.600"
								isLoading={isLoading}
							>
								Sign in
							</Button>
							<HStack mt="6" justifyContent="center">
								<Text fontSize="sm" color="general.900">
									I'm a new user.{' '}
								</Text>
								<Link 
									_text={{
										color: 'secondary.900',
										fontWeight: 'medium',
										fontSize: 'sm'
									}} 
									onPress={handleSignUp}
								>
									Sign Up
								</Link>
							</HStack>
						</VStack>
					</KeyboardAvoidingView>
				</Box>
			</Center>
		</TouchableWithoutFeedback>
	)
}

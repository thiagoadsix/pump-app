import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { SignUpScreen } from '../screens/SignUpScreen'
import { SignInScreen } from '../screens/SingInScreen'

export type AuthStackParamList = {
	SignInScreen: undefined,
	SignUpScreen: undefined,
};

const { Navigator, Screen } = createNativeStackNavigator<AuthStackParamList>()

export const AuthRoutes: React.FC = () => {
	return (
		<Navigator
			screenOptions={{
				headerShown: false
			}}
		>
			<Screen name="SignInScreen" component={SignInScreen} />
			<Screen name="SignUpScreen" component={SignUpScreen} />
		</Navigator>
	)
}

if (__DEV__) {
	import('./src/config/reactotron-config').then(() => console.log('Reactotron Configured'))
}

import { NativeBaseProvider, StatusBar } from 'native-base'
import {
	Poppins_100Thin,
	Poppins_100Thin_Italic,
	Poppins_200ExtraLight,
	Poppins_200ExtraLight_Italic,
	Poppins_300Light,
	Poppins_300Light_Italic,
	Poppins_400Regular,
	Poppins_400Regular_Italic,
	Poppins_500Medium,
	Poppins_500Medium_Italic,
	Poppins_600SemiBold,
	Poppins_600SemiBold_Italic,
	Poppins_700Bold,
	Poppins_700Bold_Italic,
	Poppins_800ExtraBold,
	Poppins_800ExtraBold_Italic,
	Poppins_900Black,
	Poppins_900Black_Italic,
	useFonts
} from '@expo-google-fonts/poppins'

import { theme } from './theme'
import { AuthContextProvider } from './src/contexts/AuthContext'
import { Routes } from './src/routes'
import { WorkoutContextProvider } from './src/contexts/WorkoutContext'

export default function App() {
	const [fonts] = useFonts({
		Poppins_100Thin,
		Poppins_100Thin_Italic,
		Poppins_200ExtraLight,
		Poppins_200ExtraLight_Italic,
		Poppins_300Light,
		Poppins_300Light_Italic,
		Poppins_400Regular,
		Poppins_400Regular_Italic,
		Poppins_500Medium,
		Poppins_500Medium_Italic,
		Poppins_600SemiBold,
		Poppins_600SemiBold_Italic,
		Poppins_700Bold,
		Poppins_700Bold_Italic,
		Poppins_800ExtraBold,
		Poppins_800ExtraBold_Italic,
		Poppins_900Black,
		Poppins_900Black_Italic,
	})

	if (!fonts) {
		return <></>
	}

	return (
		<NativeBaseProvider theme={theme}>
			<StatusBar 
				barStyle="light-content"
				backgroundColor="transparent"
				translucent
			/>
			<AuthContextProvider>
				<WorkoutContextProvider>
					<Routes />
				</WorkoutContextProvider>
			</AuthContextProvider>
		</NativeBaseProvider>
	)
}

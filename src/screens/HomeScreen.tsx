import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box, Text as TextNative } from 'native-base'
import { RootStackParamList } from '../../navigation'
import { NavigationCardComponent } from '../components/NavigationCardComponent'

type WhichScreen = 'BodyPartScreen' | 'WorkoutsScreen'

export function HomeScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'HomeScreen'>) {
	const onButtonPress = (title: WhichScreen) => {
		navigation.navigate(title)
	}

	return (
		<Box
			flex="1"
			display="flex"
			padding="5"
			backgroundColor="primary.900"
		>
			<TextNative
				bold
				fontSize="24"
				color="general.900"
			>
        Find your exercise
			</TextNative>
			<NavigationCardComponent
				title="BODY PART" 
				onPress={() => onButtonPress('BodyPartScreen')} 
			/>
			<TextNative
				bold
				fontSize="24"
				color="general.900"
			>
        Start your workout
			</TextNative>
			<NavigationCardComponent
				title="WORKOUTS"
				onPress={() => onButtonPress('WorkoutsScreen')}
			/>
		</Box>
	)
}

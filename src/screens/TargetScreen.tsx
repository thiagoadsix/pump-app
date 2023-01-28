import { View, StyleSheet, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { fetchSingle } from '../api/axios'
import { RootStackParamList } from '../../navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ExerciseComponent } from '../components/ExerciseComponent'
import { WhichTypeListComponent } from '../components/WhichTypeListComponent'

export function TargetScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'TargetScreen'>) {
	const [selected, setSelected] = useState<string>('abductors')
	const [exercises, setExercises] = useState<Array<any>>([])

	useEffect(() => {
		fetchSingle(`local/exercises/target/${selected}`, 'get')
			.then(result => {
				setExercises(result)
			})
	}, [selected])

	const handlePress = (exercise: any) => {
		navigation.navigate('ExerciseDetailScreen', { exercise })
	}

	const targets = [
		'abductors',
		'abs',
		'adductors', 
		'biceps',
		'calves',
		'cardiovascular system',
		'delts',
		'forearms',
		'glutes',
		'hamstrings',
		'lats',
		'levator scapulae',
		'pectorals',
		'quads',
		'serratus anterior',
		'spine',
		'traps',
		'triceps',
		'upper back'
	]

	return (
		<View style={styles.container}>
			<View style={styles.targetContainer}>
				<WhichTypeListComponent
					data={targets}
					selected={selected}
					setSelected={setSelected}
					horizontal
				/>
			</View>
			<ScrollView style={styles.listContainer}>
				{exercises.map((exercise, index) => (
					<ExerciseComponent key={index} exercise={exercise} handlePress={handlePress} />
				))}
			</ScrollView>
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
		padding: 15,
	},
	targetContainer: {
		padding: 15,
		alignItems: 'center',
		justifyContent: 'center',
	},
	listContainer: {
		width: '100%',
		maxWidth: 400,
		padding: 15,
	}
})

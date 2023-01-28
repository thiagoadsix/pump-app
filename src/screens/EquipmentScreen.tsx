import { useEffect, useState } from 'react'
import {  View, StyleSheet, ScrollView } from 'react-native'
import { fetchSingle } from '../api/axios'
import { RootStackParamList } from '../../navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ExerciseComponent } from '../components/ExerciseComponent'
import { WhichTypeListComponent } from '../components/WhichTypeListComponent'

export function EquipmentScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'EquipmentScreen'>) {
	const [selected, setSelected] = useState<string>('assisted')
	const [exercises, setExercises] = useState<Array<any>>([])

	useEffect(() => {
		fetchSingle(`local/exercises/equipment/${selected}`, 'get')
			.then(result => {
				setExercises(result)
			})
	}, [selected])

	const handlePress = (exercise: any) => {
		navigation.navigate('ExerciseDetailScreen', { exercise })
	}

	const equipments = [
		'assisted',
		'band',
		'barbell',
		'body weight',
		'bosu ball',
		'cable',
		'dumbbell',
		'elliptical machine',
		'ez barbell',
		'hammer',
		'kettlebell',
		'leverage machine',
		'medicine ball',
		'olympic barbell',
		'resistance band',
		'roller',
		'rope',
		'skierg machine',
		'sled machine',
		'smith machine',
		'stability ball',
		'stationary bike',
		'stepmill machine',
		'tire',
		'trap bar',
		'upper body ergometer',
		'weighted',
		'wheel roller'
	]

	return (
		<View style={styles.container}>
			<View style={styles.equipmentContainer}>
				<WhichTypeListComponent
					data={equipments}
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
	equipmentContainer: {
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

import { useContext } from 'react'

import { WorkoutContext } from '../contexts/WorkoutContext'

export function useWorkout() {
	const context = useContext(WorkoutContext)

	return context
}

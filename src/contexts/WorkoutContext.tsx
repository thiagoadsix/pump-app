import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react'
import { api } from '../api/axios'
import { WorkoutSetExercise } from '../routes/app.routes'
import { AuthContext } from './AuthContext'

interface WorkoutContextType {
	workouts: WorkoutSetExercise[];
	setWorkouts: React.Dispatch<React.SetStateAction<Array<WorkoutSetExercise>>>;
	fetchWorkouts: () => Promise<void>;
}


type WorkoutContextProviderProps = {
	children: ReactNode
}

export const WorkoutContext = createContext<WorkoutContextType>({
	workouts: [],
	setWorkouts: () => null,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	fetchWorkouts: async () => {}
})


export function WorkoutContextProvider({ children }: WorkoutContextProviderProps) {
	const [workouts, setWorkouts] = useState<Array<WorkoutSetExercise>>([])
	const { user } = useContext(AuthContext)

	useEffect(() => {
		const fetchWorkouts = async () => {
			try {
				if (user?.id) {
					const response = await api.get(`/local/workouts/user/${user.id}`)
					const data = response.data
					setWorkouts(data)
				}
			} catch (error) {
				console.log({ error: error })
				throw error
			}
		}
		fetchWorkouts()
	}, [])

	const fetchWorkouts = async () => {
		try {
			if (user?.id) {
				const response = await api.get(`/local/workouts/user/${user.id}`)
				const data = response.data
				setWorkouts(data)
			}
		} catch (error) {
			console.log({ error: error })
			throw error
		}
	}

	return (
		<WorkoutContext.Provider value={{ workouts, setWorkouts, fetchWorkouts }}>
			{children}
		</WorkoutContext.Provider>
	)
}

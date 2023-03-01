import { createContext, ReactNode, useState } from 'react'
import { api } from '../api/axios'
import { UserDTO } from '../dto/UserDTO'

export type AuthContextDataProps = {
	user: UserDTO
	signIn: (email: string, password: string) => Promise<void>
}

type AuthContextProviderProps = {
	children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
	const [user, setUser] = useState<UserDTO>({} as UserDTO)

	async function signIn(email: string, password: string) {
		try {
			const { data } = await api.post('local/users/auth/sign-in', { email, password })

			if (data.user) {
				setUser({ id: data.user.uid, name: data.user.displayName, email: data.user.email })
			}

		} catch (error) {
			throw error
		}
	}

	return (
		<AuthContext.Provider value={{ user, signIn }}>
			{children}
		</AuthContext.Provider>
	)
}

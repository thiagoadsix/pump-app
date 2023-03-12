import {createContext, ReactNode, useState} from 'react';

import {User} from '../contracts/interfaces';
import {api} from '../services/axios';

export type AuthContextType = {
  user: User;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export function AuthContextProvider({children}: AuthContextProviderProps) {
  const [user, setUser] = useState<User>({} as User);

  async function signIn(email: string, password: string) {
    try {
      const {data} = await api.post('local/users/auth/sign-in', {
        email,
        password,
      });

      if (data) {
        setUser({id: data.id, name: data.name, email: data.email});
      }
    } catch (error) {
      throw error;
    }
  }

  async function signUp(name: string, email: string, password: string) {
    try {
      const {data} = await api.post('local/users/auth/sign-up', {
        name,
        email,
        password,
      });

      if (data) {
        setUser({id: data.id, name: data.name, email: data.email});
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{user, signIn, signUp}}>
      {children}
    </AuthContext.Provider>
  );
}

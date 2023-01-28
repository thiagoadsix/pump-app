import { Set } from './Set'

export interface Workout {
  id: string
  userId: string
  name: string
  sets: Set[]
  createdAt: string
  updatedAt: string
}

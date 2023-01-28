import { BodyPartTypeAggregate, EquipmentTypeAggregate, TargetTypeAggregate } from '../aggregates/types'

export interface Exercise {
  id: string
  name: string
  target: TargetTypeAggregate
  equipment: EquipmentTypeAggregate
  bodyPart: BodyPartTypeAggregate
  url: string
}

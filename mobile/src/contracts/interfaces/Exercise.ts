import {BodyPartTypeType, EquipmentTypeType, TargetTypeType} from '../types';

export interface Exercise {
  id: string;
  name: string;
  target: TargetTypeType;
  equipment: EquipmentTypeType;
  bodyPart: BodyPartTypeType;
  url: string;
}

import { Orientation } from '@objects/types';

export enum MovingGameObjectAction {
  move = 'move',
  stay = 'stay',
}

export interface MovingGameObjectState<T extends MovingGameObjectAction> {
  orientation: Orientation;
  action: T;
}

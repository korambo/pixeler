export enum SubjectAction {
  move = 'move',
  stay = 'stay',
  attack = 'attack',
  die = 'die',
  dead = 'dead',
}

export interface SubjectState {
  action: SubjectAction;
}

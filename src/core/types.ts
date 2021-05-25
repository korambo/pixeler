export interface TCoordinates {
  x: number;
  y: number;
}

export interface TSizes {
  width: number;
  height: number;
}

export interface TPaddings {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface TPolygon extends TSizes, TCoordinates {}

export enum Flip {
  x = 'x',
  y = 'y',
}

export enum Edge {
  top = 'top',
  right = 'right',
  bottom = 'bottom',
  left = 'left',
}

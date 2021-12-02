export interface TCoordinates {
  x: number;
  y: number;
}

export interface TCoordinatesBool {
  x: boolean;
  y: boolean;
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

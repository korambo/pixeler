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
export type TDot = [x: number, y: number];

export type TPolygon = [TDot, TDot, TDot, TDot];

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

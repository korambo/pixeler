import { TCoordinates } from '@core/types';
import { Canvas, CanvasProps } from '@core/Canvas';
import { MovingGameObject } from '@objects/base/MovingGameObject';

export interface GameObjectProps extends CanvasProps {}

export abstract class GameObject extends Canvas {
  abstract boundaryCheck(movingObject: MovingGameObject): void;
}
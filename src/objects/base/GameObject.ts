import { Canvas, CanvasProps } from '@core/Canvas';
import { MovingGameObject } from '@objects/base/MovingGameObject';
import { ImageLoader } from '@core/ImageLoader/ImageLoader';

export interface GameObjectProps extends CanvasProps {
  imageLoader: ImageLoader;
}

export abstract class GameObject extends Canvas {
  protected imageLoader: ImageLoader;

  constructor(props: GameObjectProps) {
    super(props);

    this.imageLoader = props.imageLoader;
  }

  abstract boundaryCheck(movingObject: MovingGameObject): void;
}

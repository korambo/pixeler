import { Canvas, CanvasProps } from '@core/Canvas';
import { MovingGameObject } from '@objects/base/MovingGameObject';
import { ImageLoader } from '@core/ImageLoader/ImageLoader';
import { Boundary } from '@objects/types';
import { Animation } from '@core/Animation';
import {
  bottomIntersect,
  leftIntersect,
  outerRectangle,
  rightIntersect,
  topIntersect,
} from '@objects/__presets/boundaryCheck';

export interface GameObjectProps extends CanvasProps {
  boundary?: Boundary[];
  imageLoader: ImageLoader;
}

export abstract class GameObject extends Canvas {
  protected imageLoader: ImageLoader;

  protected boundary: Boundary[];
  protected animation: Animation;

  public canBoundary = true;

  constructor(props: GameObjectProps) {
    super(props);

    this.animation = new Animation(this);

    this.boundary = props.boundary || [Boundary.full];

    this.imageLoader = props.imageLoader;
  }

  public boundaryCheck(movingObject: MovingGameObject) {
    if (!movingObject.canBoundary) return;

    this.boundary.forEach((boundary) => {
      switch (boundary) {
        case Boundary.top: return topIntersect(this, movingObject);
        case Boundary.right: return rightIntersect(this, movingObject);
        case Boundary.bottom: return bottomIntersect(this, movingObject);
        case Boundary.left: return leftIntersect(this, movingObject);
        case Boundary.full: return outerRectangle(this, movingObject);
        case Boundary.horizontal: {
          return [rightIntersect(this, movingObject), leftIntersect(this, movingObject)];
        }
        case Boundary.vertical: {
          return [topIntersect(this, movingObject), bottomIntersect(this, movingObject)];
        }
      }
    });
  }
}

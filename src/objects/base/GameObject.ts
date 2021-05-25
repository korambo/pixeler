import { Canvas, CanvasProps } from '@core/Canvas';
import { ImageLoader } from '@core/ImageLoader/ImageLoader';
import { Animation } from '@core/Animation';
import { Physic } from '@effects/Physic';
import { Gravity } from '@effects/Gravity';
import { MovingGameObject } from '@objects/base/MovingGameObject';

export interface GameObjectProps extends CanvasProps {
  imageLoader: ImageLoader;
  gravity: Gravity;
  canGravity?: boolean;
}

export abstract class GameObject extends Canvas {
  protected imageLoader: ImageLoader;

  protected animation: Animation;
  protected gravity: Gravity;

  protected _physic: Physic;

  public canBoundary = true;

  protected constructor(props: GameObjectProps) {
    super(props);

    this.gravity = props.gravity;
    this.animation = new Animation(this);
    this._physic = new Physic({
      gravity: this.gravity,
      object: this,
      canCollision: true,
    });

    this.imageLoader = props.imageLoader;
  }

  public get physic() {
    return this._physic;
  }

  public effects(moving?: MovingGameObject) {
    this.physic.effect(moving);
  }

  // public boundaryCheck(movingObject: MovingGameObject) {
  //   if (!movingObject.canBoundary) return;
  //
  //   this.boundary.forEach((boundary) => {
  //     switch (boundary) {
  //       case Boundary.top: return topIntersect(this, movingObject);
  //       case Boundary.right: return rightIntersect(this, movingObject);
  //       case Boundary.bottom: return bottomIntersect(this, movingObject);
  //       case Boundary.left: return leftIntersect(this, movingObject);
  //       case Boundary.full: return outerRectangle(this, movingObject);
  //       case Boundary.horizontal: {
  //         return [rightIntersect(this, movingObject), leftIntersect(this, movingObject)];
  //       }
  //       case Boundary.vertical: {
  //         return [topIntersect(this, movingObject), bottomIntersect(this, movingObject)];
  //       }
  //     }
  //   });
  // }
}

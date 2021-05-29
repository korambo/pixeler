import { Canvas, CanvasProps } from '@core/Canvas';
import { ImageLoader } from '@core/ImageLoader/ImageLoader';
import { Animation } from '@core/Animation';
import { Physic } from '@effects/Physic';
import { Gravity } from '@effects/Gravity';
import { MovingGameObject } from '@objects/base/MovingGameObject';

export interface GameObjectProps extends CanvasProps {
  imageLoader: ImageLoader;
  gravity: Gravity;
}

export abstract class GameObject extends Canvas {
  protected imageLoader: ImageLoader;

  protected animation: Animation;
  protected gravity: Gravity;

  protected _physic: Physic;

  protected constructor(props: GameObjectProps) {
    super(props);

    this.gravity = props.gravity;
    this.animation = new Animation(this);
    this._physic = new Physic({
      gravity: this.gravity,
      object: this,
      canCollision: true,
      canInteraction: false,
    });

    this.imageLoader = props.imageLoader;
  }

  public get physic() {
    return this._physic;
  }

  public effects(moving?: MovingGameObject) {
    this.physic.effect(moving);
  }
}

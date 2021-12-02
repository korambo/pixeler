import { Canvas, CanvasProps } from '@core/Canvas';
import { AssetsLoader } from '@core/Assets/AssetsLoader';
import { Animation } from '@core/Animation';
import { Physic } from '@physic/Physic';
import { Gravity } from '@physic/Gravity';
import { MovingGameObject } from '@objects/base/MovingGameObject';
import { Image } from '@core/Assets/Image';
import { Sprite } from '@core/Assets/Sprite';

export interface GameObjectProps extends CanvasProps {
  assetsLoader: AssetsLoader;
  gravity: Gravity;
}

export abstract class GameObject extends Canvas {
  protected assetsLoader: AssetsLoader;
  protected image: Record<string, Image>;
  protected sprite: Record<string, Sprite>;

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

    this.assetsLoader = props.assetsLoader;
  }

  public get physic() {
    return this._physic;
  }

  public effects(moving?: MovingGameObject) {
    this.physic.effect(moving);
  }
}

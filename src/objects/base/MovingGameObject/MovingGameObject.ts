import { GameObject, GameObjectProps } from '@objects/base/GameObject';
import { MovingPhysic } from '@physic/MovingPhysic';
import { State } from '@core/State';
// import { MovingGameObjectState } from '@objects/base/MovingGameObject/constants';

export interface MovingGameObjectProps extends GameObjectProps {}

export abstract class MovingGameObject extends GameObject {
  protected _physic: MovingPhysic;

  protected _state: State<any>;

  protected constructor(props: MovingGameObjectProps) {
    super(props);

    this._physic = new MovingPhysic({
      gravity: this.gravity,
      object: this,
      canCollision: true,
      canInteraction: true,
    });
  }

  public get state() {
    return this._state;
  }

  public get physic() {
    return this._physic;
  }

  public abstract animate(): void;
}

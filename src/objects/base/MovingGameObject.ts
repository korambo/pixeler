import { MoveOrientation, Orientation } from '@objects/types';
import { GameObject, GameObjectProps } from '@objects/base/GameObject';
import { MovingPhysic } from '@effects/MovingPhysic';

export interface MovingGameObjectProps extends GameObjectProps {

}

export abstract class MovingGameObject extends GameObject {
  protected abstract orientation: Orientation;

  protected moveOrientation: MoveOrientation[];

  protected _physic: MovingPhysic;

  protected constructor(props: MovingGameObjectProps) {
    super(props);

    this._physic = new MovingPhysic({
      gravity: this.gravity,
      object: this,
      canCollision: true,
      canInteraction: true,
    });
  }

  public get physic() {
    return this._physic;
  }

  public abstract animate(): void;

  public orientationOnlyIs = (orientations: MoveOrientation[]) => this.moveOrientation.every((item) => (
    orientations.includes(item)
  ));

  public orientationIs = (orientations: MoveOrientation[]) => this.moveOrientation.some((item) => (
    orientations.includes(item)
  ));

  public setMoveOrientation = (orientation: MoveOrientation[]) => {
    this.moveOrientation = orientation;
  };
}

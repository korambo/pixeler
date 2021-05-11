import { Gravity } from '@effects/Gravity';
import { Orientation } from '@objects/types';
import { GameObject, GameObjectProps } from '@objects/base/GameObject';

export interface MovingGameObjectProps extends GameObjectProps {
  gravity: Gravity,
}

export abstract class MovingGameObject extends GameObject {
  private acceleration = 0;

  abstract speed: number;

  abstract jumpSpeed: number;

  abstract jumpTime: number;

  abstract orientation: Orientation;

  protected gravity: Gravity;

  public canMove = false;

  public isJump = false;

  public isOnGround = false;

  protected constructor(props: MovingGameObjectProps) {
    super(props);

    this.gravity = props.gravity;
  }

  abstract effects(): void;

  abstract inputEffects(): void;

  public setIsOnGround = (isOnGround: boolean) => {
    this.isOnGround = isOnGround;
  };

  public getAcceleration = () => this.acceleration;

  public setAcceleration = (acceleration: number) => {
    this.acceleration = acceleration;
  };
}

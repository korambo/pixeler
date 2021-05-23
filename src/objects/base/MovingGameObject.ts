import { Gravity } from '@effects/Gravity';
import { MoveOrientation, Orientation } from '@objects/types';
import { GameObject, GameObjectProps } from '@objects/base/GameObject';

export interface MovingGameObjectProps extends GameObjectProps {
  gravity: Gravity,
}

export abstract class MovingGameObject extends GameObject {
  private acceleration = 0;

  protected abstract speed: number;

  protected abstract jumpSpeed: number;
  protected abstract jumpTime: number;

  protected abstract orientation: Orientation;

  protected moveOrientation: MoveOrientation[];

  protected gravity: Gravity;

  public canMove = false;

  public isJump = false;
  public isOnGround = false;
  public isMoving = false;

  protected constructor(props: MovingGameObjectProps) {
    super(props);

    this.gravity = props.gravity;
  }

  public abstract animate(): void;

  public abstract effects(): void;

  public abstract inputEffects(): void;

  public orientationOnlyIs = (orientations: MoveOrientation[]) => this.moveOrientation.every((item) => (
    orientations.includes(item)
  ));

  public orientationIs = (orientations: MoveOrientation[]) => this.moveOrientation.some((item) => (
    orientations.includes(item)
  ));

  public setMoveOrientation = (orientation: MoveOrientation[]) => {
    this.moveOrientation = orientation;
  };

  public setIsOnGround = (isOnGround: boolean) => {
    this.isOnGround = isOnGround;
  };

  public getAcceleration = () => this.acceleration;

  public setAcceleration = (acceleration: number) => {
    this.acceleration = acceleration;
  };

  public setJump = (isJum: boolean) => {
    this.isJump = isJum;
  };
}

import { TCoordinates, TCoordinatesBool } from '@core/types';
import { MovingGameObject } from '@objects/base/MovingGameObject';
import { Physic, PhysicProps } from '@physic/Physic';
import { Draw } from '@core/Draw';
import { MoveOrientation, Orientation } from '@objects/types';
import { Gravity } from '@physic/Gravity';
import { SubjectAction } from '@objects/base/Subject/constants';
import { MovingGameObjectAction } from '@objects/base/MovingGameObject/constants';

export interface MovingPhysicProps extends PhysicProps {
  object: MovingGameObject;
  speed?: number;
}

export class MovingPhysic extends Physic {
  protected readonly gravity: Gravity;
  protected readonly object: MovingGameObject;

  private _onGround: boolean;
  private _isMoving: TCoordinatesBool = { x: false, y: false };
  private _canMoving: TCoordinatesBool = { x: true, y: false };

  private _acceleration = 0;
  private _velocity: TCoordinates = { x: 0, y: 0 };
  private _speed = Draw.getPixels(1.4);

  public constructor(props: MovingPhysicProps) {
    super(props);

    // REMOVE THIS (ONLY FOR STORYBOOK)
    this.object = props.object;
    this.gravity = props.gravity;

    if (props.speed) {
      this._speed = props.speed;
    }
  }

  protected get acceleration() {
    return this._acceleration;
  }

  protected set acceleration(acceleration) {
    this._acceleration = acceleration;
  }

  protected set velocity(velocity: Partial<TCoordinates>) {
    this._velocity = { ...this._velocity, ...velocity };
  }

  protected get velocity() {
    return this._velocity;
  }

  public get onGround() {
    return this._onGround;
  }

  public set onGround(onGround) {
    this._onGround = onGround;
  }

  public get isMoving() {
    return this._isMoving;
  }

  public set isMoving(isMoving: Partial<TCoordinatesBool>) {
    this._isMoving = { ...this._isMoving, ...isMoving };
  }

  public get canMoving() {
    return this._canMoving;
  }

  public set canMoving(canMoving: Partial<TCoordinatesBool>) {
    this._canMoving = { ...this._canMoving, ...canMoving };
  }

  public get speed() {
    return this._speed;
  }

  protected accelerationEffect() {
    const accelerationPower = this.gravity.getAccelerationPower();

    if (this._acceleration > 0) {
      this._acceleration -= accelerationPower;
    } else if (this._acceleration < 0) {
      this._acceleration = 0;
    }
  }

  protected gravityEffect() {
    const gravityPower = this.gravity.getGravityPower();

    if (this.onGround) return;

    this.velocity = { y: gravityPower };
  }

  protected velocityEffect() {
    const { x, y } = this.object.getCoordinates();

    if (this.velocity.x) {
      // console.log(this.object.constructor.ndame);
    }

    this.object.setCoordinates({
      x: x + this.velocity.x,
      y: y + this.velocity.y,
    });
  }

  public moveX(orientation: MoveOrientation.left | MoveOrientation.right) {
    const { die, dead } = this.object.state.get();
    const { state } = this.object;

    switch (orientation) {
      case MoveOrientation.left: {
        if (state.get().orientation !== Orientation.left) {
          state.set({ orientation: Orientation.left });
        }
        this.velocity = { x: -this.speed };
        this.isMoving = { x: true };
        break;
      }
      case MoveOrientation.right: {
        if (state.get().orientation !== Orientation.right) {
          state.set({ orientation: Orientation.right });
        }
        this.velocity = { x: +this.speed };
        this.isMoving = { x: true };
      }
    }

    if (!die && !dead) {
      this.object.state.set({ action: SubjectAction.move });
    }
  }

  public moveY(orientation: MoveOrientation.up | MoveOrientation.down) {
    switch (orientation) {
      case MoveOrientation.up: {
        this.velocity = { y: -this.speed };
        this.isMoving = { y: true };
        break;
      }
      case MoveOrientation.down: {
        this.velocity = { y: +this.speed };
        this.isMoving = { y: true };
      }
    }
  }

  public stopY() {
    this.velocity = { y: 0 };
    this.isMoving = { y: false };
  }

  public stopX() {
    const { action } = this.object.state.get();

    this.velocity = { x: 0 };
    this.isMoving = { x: false };

    if (action === MovingGameObjectAction.move) {
      this.object.state.set({ action: SubjectAction.stay });
    }
  }

  public stop() {
    const { action } = this.object.state.get();

    this.velocity = { x: 0, y: 0 };
    this._isMoving = { x: false, y: false };

    if (action === MovingGameObjectAction.move) {
      this.object.state.set({ action: SubjectAction.stay });
    }
  }

  public movingEffect() {
    this._onGround = false;

    this.accelerationEffect();
    this.gravityEffect();
    this.velocityEffect();
  }
}

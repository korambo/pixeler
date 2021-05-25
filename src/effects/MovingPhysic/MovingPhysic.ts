import { TCoordinates } from '@core/types';
import { MovingGameObject } from '@objects/base/MovingGameObject';
import { Physic } from '@effects/Physic';
import { Draw } from '@core/Draw';
import { MoveOrientation } from '@objects/types';

interface JumpOptions {
  speed: number;
  time: number;
  active: boolean;
}

// interface MovingPhysicProps extends PhysicProps {}

export class MovingPhysic extends Physic {
  protected object: MovingGameObject;

  private _acceleration = 0;
  private _velocity: TCoordinates = { x: 0, y: 0 };
  private _speed = Draw.getPixels(1.4);
  private _jumpOptions: JumpOptions = {
    speed: Draw.getPixels(6),
    time: 500,
    active: false,
  };

  private _onGround: boolean;
  private _isMoving: boolean;

  public set onGround(onGround) {
    this._onGround = onGround;
  }

  public get onGround() {
    return this._onGround;
  }

  public set isMoving(isMoving) {
    this._isMoving = isMoving;
  }

  public get isMoving() {
    return this._isMoving;
  }

  public set acceleration(acceleration) {
    this._acceleration = acceleration;
  }

  public get acceleration() {
    return this._acceleration;
  }

  public set velocity(velocity: Partial<TCoordinates>) {
    this._velocity = { ...this._velocity, ...velocity };
  }

  public get velocity() {
    return this._velocity;
  }

  public set speed(speed) {
    this._speed = speed;
  }

  public get speed() {
    return this._speed;
  }

  public set jumpOptions(jumpOptions) {
    this._jumpOptions = jumpOptions;
  }

  public get jumpOptions() {
    return this._jumpOptions;
  }

  private accelerationEffect() {
    const accelerationPower = this.gravity.getAccelerationPower();

    if (this.acceleration > 0) {
      this.acceleration -= accelerationPower;
    } else if (this.acceleration < 0) {
      this.acceleration = 0;
    }
  }

  private gravityEffect() {
    const gravityPower = this.gravity.getGravityPower();

    if (this.onGround || this.jumpOptions.active) return;

    this.velocity = { y: gravityPower };
  }

  private velocityEffect() {
    const { x, y } = this.object.getCoordinates();

    this.object.setCoordinates({
      x: x + this.velocity.x,
      y: y + this.velocity.y,
    });
  }

  public jump(canJump: boolean) {
    const gravityPower = this.gravity.getGravityPower();

    if (canJump && this.onGround && !this.jumpOptions.active) {
      this.jumpOptions.active = true;
      this.acceleration = this.jumpOptions.speed;
      setTimeout(() => { this.jumpOptions.active = false; }, this.jumpOptions.time);
    }

    if (this.jumpOptions.active) {
      this.velocity = { y: gravityPower - this.acceleration };
    }
  }

  public moveX(orientation: MoveOrientation.left | MoveOrientation.right) {
    switch (orientation) {
      case MoveOrientation.left: {
        this.velocity = { x: -this.speed };
        this.isMoving = true;
        break;
      }
      case MoveOrientation.right: {
        this.velocity = { x: +this.speed };
        this.isMoving = true;
      }
    }
  }

  public stopX() {
    this.velocity = { x: 0 };
    this.isMoving = false;
  }

  public effect(moving: MovingGameObject) {
    super.effect(moving);

    this.onGround = false;

    this.accelerationEffect();
    this.gravityEffect();
    this.velocityEffect();
  }
}

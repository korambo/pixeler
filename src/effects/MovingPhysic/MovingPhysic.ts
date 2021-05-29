import { TCoordinates } from '@core/types';
import { MovingGameObject } from '@objects/base/MovingGameObject';
import { Physic, PhysicProps } from '@effects/Physic';
import { Draw } from '@core/Draw';
import { MoveOrientation } from '@objects/types';
import { Gravity } from '@effects/Gravity';

interface JumpOptions {
  speed: number;
  time: number;
  active: boolean;
}

interface MovingPhysicProps extends PhysicProps {
  object: MovingGameObject;
}

export class MovingPhysic extends Physic {
  protected readonly gravity: Gravity;
  protected readonly object: MovingGameObject;

  private _onGround: boolean;
  private _onStairs: boolean;
  private _isMoving: boolean;
  private _canMoving = { x: true, y: false };

  private _acceleration = 0;
  private _velocity: TCoordinates = { x: 0, y: 0 };
  private _speed = Draw.getPixels(1.4);

  private _jumpOptions: JumpOptions = {
    speed: Draw.getPixels(6),
    time: 500,
    active: false,
  };

  // REMOVE THIS (ONLY FOR STORYBOOK)
  public constructor(props: MovingPhysicProps) {
    super(props);
    this.object = props.object;
    this.gravity = props.gravity;
  }

  private set velocity(velocity: Partial<TCoordinates>) {
    this._velocity = { ...this._velocity, ...velocity };
  }

  private get velocity() {
    return this._velocity;
  }

  private set jumpOptions(jumpOptions: Partial<JumpOptions>) {
    this._jumpOptions = { ...this._jumpOptions, ...jumpOptions };
  }

  private get jumpOptions() {
    return this._jumpOptions;
  }

  public get onStairs() {
    return this._onStairs;
  }

  public set onStairs(onStairs) {
    this._onStairs = onStairs;
  }

  public get onGround() {
    return this._onGround;
  }

  public set onGround(onGround) {
    this._onGround = onGround;
  }

  public get canMoving() {
    return this._canMoving;
  }

  public set canMoving(canYMoving: Partial<{ x: boolean; y: boolean }>) {
    this._canMoving = { ...this._canMoving, ...canYMoving };
  }

  public get isMoving() {
    return this._isMoving;
  }

  public get speed() {
    return this._speed;
  }

  private accelerationEffect() {
    const accelerationPower = this.gravity.getAccelerationPower();

    if (this._acceleration > 0) {
      this._acceleration -= accelerationPower;
    } else if (this._acceleration < 0) {
      this._acceleration = 0;
    }
  }

  private gravityEffect() {
    const gravityPower = this.gravity.getGravityPower();

    if (this.onGround || this.onStairs || this.jumpOptions.active) return;

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
      this.jumpOptions = { active: true };
      this._acceleration = this.jumpOptions.speed;
      setTimeout(() => { this.jumpOptions = { active: false }; }, this.jumpOptions.time);
    }

    if (this.jumpOptions.active) {
      this.velocity = { y: gravityPower - this._acceleration };
    }
  }

  public moveX(orientation: MoveOrientation.left | MoveOrientation.right) {
    switch (orientation) {
      case MoveOrientation.left: {
        this.velocity = { x: -this.speed };
        this._isMoving = true;
        break;
      }
      case MoveOrientation.right: {
        this.velocity = { x: +this.speed };
        this._isMoving = true;
      }
    }
  }

  public moveY(orientation: MoveOrientation.up | MoveOrientation.down) {
    switch (orientation) {
      case MoveOrientation.up: {
        this.velocity = { y: -this.speed };
        this._isMoving = true;
        break;
      }
      case MoveOrientation.down: {
        this.velocity = { y: +this.speed };
        this._isMoving = true;
      }
    }
  }

  public stop() {
    this.velocity = { x: 0, y: 0 };
    this._isMoving = false;
  }

  public effect(moving: MovingGameObject) {
    super.effect(moving);

    this.canCollision = !this.onStairs;

    this.accelerationEffect();
    this.gravityEffect();
    this.velocityEffect();

    this._onGround = false;
  }
}

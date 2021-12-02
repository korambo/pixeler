import { MovingPhysic, MovingPhysicProps } from '@physic/MovingPhysic';
import { Draw } from '@core/Draw';
import { Gravity } from '@physic/Gravity';
import { Subject } from '@objects/base/Subject';
import { EffectOptions } from '@effects/types';
import { PhysicOptions } from '@physic/constants';
import { Orientation } from '@objects/types';

interface SubjectPhysicProps extends MovingPhysicProps {
  object: Subject;
  speed?: number;
}

export class SubjectPhysic extends MovingPhysic {
  protected readonly gravity: Gravity;
  protected readonly object: Subject;

  private _onStairs: boolean;

  private _damageOptions: PhysicOptions = {
    speed: Draw.getPixels(3),
    time: 250,
    active: false,
  };

  private _jumpOptions: PhysicOptions = {
    speed: Draw.getPixels(6),
    time: 500,
    active: false,
  };

  public constructor(props: SubjectPhysicProps) {
    super(props);

    // REMOVE THIS (ONLY FOR STORYBOOK)
    this.object = props.object;
    this.gravity = props.gravity;
  }

  public set damageOptions(damageOptions: Partial<PhysicOptions>) {
    this._damageOptions = { ...this._damageOptions, ...damageOptions };
  }

  public get damageOptions() {
    return this._damageOptions;
  }

  public set jumpOptions(jumpOptions: Partial<PhysicOptions>) {
    this._jumpOptions = { ...this._jumpOptions, ...jumpOptions };
  }

  public get jumpOptions() {
    return this._jumpOptions;
  }

  public get onStairs() {
    return this._onStairs;
  }

  public set onStairs(onStairs) {
    this._onStairs = onStairs;
  }

  protected gravityEffect() {
    const gravityPower = this.gravity.getGravityPower();

    if (this.onGround || this.onStairs || this.jumpOptions.active) return;

    this.velocity = { y: gravityPower };
  }

  public damage(damaged: EffectOptions) {
    if (damaged.active && !this.damageOptions.active) {
      this.damageOptions = { active: true };
      this.acceleration = this.damageOptions.speed;
      setTimeout(() => { this.damageOptions = { active: false }; }, this.damageOptions.time);
    }

    if (this.damageOptions.active) {
      this.velocity = { x: damaged.orientation === Orientation.left ? -this.acceleration : this.acceleration };
    }
  }

  public jump(canJump: boolean) {
    const gravityPower = this.gravity.getGravityPower();

    if (canJump && this.onGround && !this.jumpOptions.active) {
      this.jumpOptions = { active: true };
      this.acceleration = this.jumpOptions.speed;
      setTimeout(() => { this.jumpOptions = { active: false }; }, this.jumpOptions.time);
    }

    if (this.jumpOptions.active) {
      this.velocity = { y: gravityPower - this.acceleration };
    }
  }

  public movingEffect() {
    super.movingEffect();

    this.canCollision = !this.onStairs;

    this.gravityEffect();
  }
}

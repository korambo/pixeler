import { Gravity } from '@physic/Gravity';
import { MovingGameObject } from '@objects/base/MovingGameObject';
import { GameObject } from '@objects/base/GameObject';
import { Player } from '@objects/special/Player';
import { TPolygon } from '@core/types';

interface CollisionDict {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface CollisionOptions {
  damage: boolean;
  active: boolean;
}

export interface PhysicProps {
  gravity: Gravity;
  object: GameObject;
  canCollision: boolean;
  canInteraction: boolean;
  collisionOptions?: Pick<CollisionOptions, 'damage'>;
}

export class Physic {
  protected readonly gravity: Gravity;
  protected readonly object: GameObject;

  private _collisionOptions: CollisionOptions = {
    damage: false,
    active: false,
  };

  private _canCollision: boolean;
  private _canInteraction: boolean;
  private _playerIntersect: boolean;

  public constructor(props: PhysicProps) {
    this.gravity = props.gravity;
    this.object = props.object;

    this._canCollision = props.canCollision;
    this._canInteraction = props.canInteraction;

    if (props.collisionOptions) {
      this.collisionOptions = props.collisionOptions;
    }
  }

  public get canCollision() {
    return this._canCollision;
  }

  public set canCollision(canCollision) {
    this._canCollision = canCollision;
  }

  protected get canInteraction() {
    return this._canInteraction;
  }

  protected set canInteraction(canInteraction) {
    this._canInteraction = canInteraction;
  }

  public static polygonsIntersect(a: TPolygon, b: TPolygon) {
    return !(
      b.x > a.width + a.x ||
      a.x > b.width + b.x ||
      b.y > a.height + a.y ||
      a.y > b.height + b.y
    );
  }

  protected hasIntersect(moving: MovingGameObject) {
    const objectPolygon = this.object.getPolygon();
    const movingPolygon = moving.getPolygon();

    return Physic.polygonsIntersect(objectPolygon, movingPolygon);
  }

  public static polygonsCollision(a: TPolygon, b: TPolygon) {
    return {
      top: b.y + b.height - a.y,
      right: b.x + b.width - a.x,
      bottom: a.y + a.height - b.y,
      left: a.x + a.width - b.x,
    };
  }

  public calcCollision(moving: MovingGameObject): CollisionDict {
    const objectPolygon = this.object.getPolygon();
    const movingPolygon = moving.getPolygon();

    return Physic.polygonsCollision(objectPolygon, movingPolygon);
  }

  private yCollision(moving: MovingGameObject, collision: CollisionDict) {
    const objectPolygon = this.object.getPolygon();
    const movingPolygon = moving.getPolygon();

    if (collision.top && collision.top < collision.bottom) {
      moving.physic.onGround = true;
      moving.setCoordinates({ y: objectPolygon.y - movingPolygon.height });
      return;
    }

    if (collision.bottom && collision.bottom < collision.top) {
      moving.setCoordinates({ y: objectPolygon.y + objectPolygon.height });
      return;
    }
  }

  private xCollision(moving: MovingGameObject, collision: CollisionDict) {
    const objectPolygon = this.object.getPolygon();
    const movingPolygon = moving.getPolygon();

    if (collision.left && collision.left < collision.right) {
      moving.setCoordinates({ x: objectPolygon.x + objectPolygon.width });
      return;
    }

    if (collision.right && collision.right < collision.left) {
      moving.setCoordinates({ x: objectPolygon.x - movingPolygon.width });
      return;
    }
  }

  public collisionEffect(moving: MovingGameObject) {
    const collision = this.calcCollision(moving);

    const xCollisionMin = Math.min(Math.abs(collision.right), Math.abs(collision.left));
    const yCollisionMin = Math.min(Math.abs(collision.top), Math.abs(collision.bottom));

    const canX = xCollisionMin > 0 && xCollisionMin < yCollisionMin;
    const canY = yCollisionMin > 0 && yCollisionMin < xCollisionMin;

    if (canX && !this.collisionOptions.active) {
      this.xCollision(moving, collision);
      this.collisionOptions = { active: true };
    } else {
      this.collisionOptions = { active: false };
    }

    if (canY && !this.collisionOptions.active) {
      this.yCollision(moving, collision);
      this.collisionOptions = { active: true };
    } else {
      this.collisionOptions = { active: false };
    }
  }

  public get playerIntersect() {
    return this._playerIntersect;
  }

  public get collisionOptions() {
    return this._collisionOptions;
  }

  public set collisionOptions(collisionOptions: Partial<CollisionOptions>) {
    this._collisionOptions = { ...this._collisionOptions, ...collisionOptions };
  }

  public effect(moving?: MovingGameObject) {
    const intersect = moving && (this.canCollision || this.canInteraction) ? this.hasIntersect(moving) : false;

    if (this.canInteraction && moving instanceof Player) {
      this._playerIntersect = intersect;
    }

    if (this.canCollision && intersect && moving.physic.canCollision) {
      this.collisionEffect(moving);
    }
  }
}

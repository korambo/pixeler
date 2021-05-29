import { Gravity } from '@effects/Gravity';
import { MovingGameObject } from '@objects/base/MovingGameObject';
import { GameObject } from '@objects/base/GameObject';
import { Player } from '@objects/Player';

interface CollisionDict {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface CollisionOptions {
  active: boolean;
}

export interface PhysicProps {
  gravity: Gravity;
  object: GameObject;
  canCollision: boolean;
  canInteraction: boolean;
}

export class Physic {
  protected readonly gravity: Gravity;
  protected readonly object: GameObject;

  private _collisionOptions: CollisionOptions = {
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

  private hasIntersect(moving: MovingGameObject) {
    const objectPolygon = this.object.getPolygon();
    const movingPolygon = moving.getPolygon();

    return !(
      movingPolygon.x > objectPolygon.width + objectPolygon.x ||
      objectPolygon.x > movingPolygon.width + movingPolygon.x ||
      movingPolygon.y > objectPolygon.height + objectPolygon.y ||
      objectPolygon.y > movingPolygon.height + movingPolygon.y
    );
  }

  public calcCollision(moving: MovingGameObject): CollisionDict {
    const objectPolygon = this.object.getPolygon();
    const movingPolygon = moving.getPolygon();

    return {
      top: movingPolygon.y + movingPolygon.height - objectPolygon.y,
      right: movingPolygon.x + movingPolygon.width - objectPolygon.x,
      bottom: objectPolygon.y + objectPolygon.height - movingPolygon.y,
      left: objectPolygon.x + objectPolygon.width - movingPolygon.x,
    };
  }

  private yCollision(moving: MovingGameObject, collision: CollisionDict) {
    const objectPolygon = this.object.getPolygon();
    const movingPolygon = moving.getPolygon();

    if (collision.top && collision.top < collision.bottom) {
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

  private collisionEffect(moving: MovingGameObject) {
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

  private groundEffect(moving: MovingGameObject) {
    const objectPolygon = this.object.getPolygon();
    const movingPolygon = moving.getPolygon();

    moving.physic.onGround = movingPolygon.y === objectPolygon.y - movingPolygon.height;
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

    if (this.canCollision && intersect) {
      this.groundEffect(moving);
    }
  }
}

import { Gravity } from '@effects/Gravity';
import { MovingGameObject } from '@objects/base/MovingGameObject';
import { GameObject } from '@objects/base/GameObject';
import { Player } from '@objects/Player';

export interface PhysicProps {
  gravity: Gravity;
  object: GameObject;
  canCollision: boolean;
}

export class Physic {
  protected readonly gravity: Gravity;
  protected readonly object: GameObject;

  protected canCollision: boolean;

  protected _playerIntersect: boolean;

  public constructor(props: PhysicProps) {
    this.gravity = props.gravity;
    this.object = props.object;

    this.canCollision = props.canCollision;
  }

  public get playerIntersect() {
    return this._playerIntersect;
  }

  public set playerIntersect(playerIntersect) {
    this._playerIntersect = playerIntersect;
  }

  private hasIntersect = (moving: MovingGameObject) => {
    const objectPolygon = this.object.getPolygon();
    const movingPolygon = moving.getPolygon();

    return !(
      movingPolygon.x > objectPolygon.width + objectPolygon.x ||
      objectPolygon.x > movingPolygon.width + movingPolygon.x ||
      movingPolygon.y > objectPolygon.height + objectPolygon.y ||
      objectPolygon.y > movingPolygon.height + movingPolygon.y
    );
  };

  private collisionEffect = (moving: MovingGameObject) => {
    const objectPolygon = this.object.getPolygon();
    const movingPolygon = moving.getPolygon();

    const movingPhysic = moving.physic;

    if (movingPolygon.x + movingPolygon.width > objectPolygon.x) {
      // console.log(1);
    }

    if (movingPolygon.y + movingPolygon.height > objectPolygon.y) {
      moving.setCoordinates({ y: objectPolygon.y - movingPolygon.height });
      movingPhysic.onGround = true;
    }
  };

  public effect(moving?: MovingGameObject) {
    const intersect = !moving ? false : this.hasIntersect(moving);

    if (moving && moving instanceof Player) {
      this.playerIntersect = intersect;
    }

    if (intersect && this.canCollision) {
      this.collisionEffect(moving);
    }
  }
}

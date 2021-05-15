import { Inputs } from '@effects/Inputs';
import { MovingGameObject, MovingGameObjectProps } from '@objects/base/MovingGameObject';
import { outerSquire } from '@objects/__presets/boundaryCheck';

import { Orientation } from '@objects/types';

import { drawPlayer } from '@objects/Player/draw';
import { Edge, Flip, TPolygon } from '@core/types';
import { Draw } from '@core/Draw';

interface PlayerProps extends MovingGameObjectProps {
  inputs: Inputs;
}

export class Player extends MovingGameObject {
  width = 10;
  height = 20;

  inputs: Inputs;

  orientation = Orientation.right;

  speed = Draw.getPixels(1.5);
  jumpSpeed = Draw.getPixels(3);
  jumpTime = 300;

  constructor(props: PlayerProps) {
    super(props);

    this.inputs = props.inputs;
  }

  public boundaryCheck(movingObject: MovingGameObject) {
    outerSquire(this, movingObject);
  }

  public draw = () => {
    const coordinates = this.getCoordinates();
    const sizes = this.getSizes();

    switch (this.orientation) {
      case Orientation.right: {
        drawPlayer({ sizes, coordinates, flip: null });
        break;
      }
      case Orientation.left: {
        drawPlayer({ sizes, coordinates, flip: Flip.x });
      }
    }
  };

  // eslint-disable-next-line consistent-return
  public getEdgePolygon(edge: Edge): TPolygon {
    const sizes = this.getSizes();
    const coordinates = this.getCoordinates();

    switch (edge) {
      case Edge.top:
      case Edge.right:
      case Edge.left: {
        return MovingGameObject.prototype.getEdgePolygon.call(this, edge) as TPolygon;
      }
      case Edge.bottom: {
        switch (this.orientation) {
          case Orientation.right: {
            return [
              [coordinates.x, coordinates.y + sizes.height],
              [Draw.removePixels(coordinates.x + sizes.width, 2), coordinates.y + sizes.height],
              [Draw.removePixels(coordinates.x + sizes.width, 2), coordinates.y + sizes.height - this.edgeSize],
              [coordinates.x, coordinates.y + sizes.height - this.edgeSize],
            ];
          }
          case Orientation.left: {
            return [
              [Draw.addPixels(coordinates.x, 2), coordinates.y + sizes.height],
              [coordinates.x + sizes.width, coordinates.y + sizes.height],
              [coordinates.x + sizes.width, coordinates.y + sizes.height - this.edgeSize],
              [Draw.addPixels(coordinates.x, 2), coordinates.y + sizes.height - this.edgeSize],
            ];
          }
        }
      }
    }
  }

  private checkCanMove = () => {
    this.canMove = this.isOnGround;
  };

  private jump = () => {
    const coordinates = this.getCoordinates();
    const keysPressed = this.inputs.getKeysPressed();

    if (keysPressed.jump && this.canMove && !this.isJump) {
      this.isJump = true;
      this.setAcceleration(this.jumpSpeed);
      setTimeout(() => { this.isJump = false; }, this.jumpTime);
    }

    if (this.isJump) {
      this.setCoordinates({ y: coordinates.y - this.getAcceleration() });
    }
  };

  private move = () => {
    const coordinates = this.getCoordinates();
    const keysPressed = this.inputs.getKeysPressed();

    if (keysPressed.up && this.isOnGround) {
      // this.setCoordinates({ y: coordinates.y - this.speed });
    }

    if (keysPressed.down && this.isOnGround) {
      // this.setCoordinates({ y: coordinates.y + this.speed });
    }

    if (keysPressed.left) {
      this.orientation = Orientation.left;
      this.setCoordinates({ x: coordinates.x - this.speed });
    }

    if (keysPressed.right) {
      this.orientation = Orientation.right;
      this.setCoordinates({ x: coordinates.x + this.speed });
    }
  };

  private gravityEffect = () => {
    const coordinates = this.getCoordinates();
    const acceleration = this.getAcceleration();
    const accelerationPower = this.gravity.getAccelerationPower();
    const gravityPower = this.gravity.getGravityPower();

    let canGravity = !this.isOnGround;

    if (this.isJump) {
      canGravity = false;
    }

    if (acceleration > 0) {
      this.setAcceleration(acceleration - accelerationPower);
    } else if (acceleration < 0) {
      this.setAcceleration(0);
    }

    if (canGravity) {
      this.setCoordinates({ y: coordinates.y + gravityPower });
    }
  };

  public animate = () => {};

  public inputEffects = () => {
    this.move();
    this.jump();
  };

  private checkOnGround = () => {
    // const coordinates = this.getCoordinates();
    // const sizes = this.getSizes();

    // this.setIsOnGround(coordinates.y >= this.canvas.height - sizes.height);
    this.setIsOnGround(false);
  };

  public effects = () => {
    this.gravityEffect();
    this.checkCanMove();
    this.checkOnGround();
  };
}

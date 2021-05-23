import { Inputs } from '@effects/Inputs';
import { MovingGameObject, MovingGameObjectProps } from '@objects/base/MovingGameObject';
import { outerRectangle } from '@objects/__presets/boundaryCheck';

import { MoveOrientation, Orientation } from '@objects/types';

import { Edge, TPolygon } from '@core/types';
import { Draw } from '@core/Draw';
import { Sprite } from '@core/Sprite';
import { SpriteAnimationOrientation } from '@core/Animation/types';

interface PlayerProps extends MovingGameObjectProps {
  inputs: Inputs;
}

export class Player extends MovingGameObject {
  protected width = 18;
  protected height = 24;

  private inputs: Inputs;

  protected orientation = Orientation.right;
  protected moveOrientation = [MoveOrientation.horizontal];

  protected speed = Draw.getPixels(1.4);
  protected jumpSpeed = Draw.getPixels(3.4);
  protected jumpTime = 300;

  private sprite: { stay: Sprite; move: Sprite };

  constructor(props: PlayerProps) {
    super(props);

    this.inputs = props.inputs;
  }

  private initSprite = () => {
    const frameSize = { width: this.width, height: this.height };

    this.sprite = {
      stay: new Sprite({
        image: this.imageLoader.getImage('player_stay_sprite'),
        frameSize,
        canFlip: true,
      }),
      move: new Sprite({
        image: this.imageLoader.getImage('player_move_sprite'),
        frameSize,
        canFlip: true,
      }),
    };
  };

  public boundaryCheck(movingObject: MovingGameObject) {
    outerRectangle(this, movingObject);
  }

  public draw = () => {
    const coordinates = this.getCoordinates();

    if (!this.sprite) {
      this.initSprite();
    }

    if (this.isMoving) {
      this.animation
        .sprite(this.sprite.move, SpriteAnimationOrientation.x, 12)
        .drawImage(coordinates, this.orientation === Orientation.left);
      return;
    }

    this.animation
      .sprite(this.sprite.stay, SpriteAnimationOrientation.x, 18)
      .drawImage(coordinates, this.orientation === Orientation.left);
  };

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
              [Draw.addPixels(coordinates.x, 4), coordinates.y + sizes.height],
              [Draw.removePixels(coordinates.x + sizes.width, 3), coordinates.y + sizes.height],
              [Draw.removePixels(coordinates.x + sizes.width, 3), coordinates.y + sizes.height - this.edgeSize],
              [Draw.addPixels(coordinates.x, 4), coordinates.y + sizes.height - this.edgeSize],
            ];
          }
          case Orientation.left: {
            return [
              [Draw.addPixels(coordinates.x, 3), coordinates.y + sizes.height],
              [Draw.removePixels(coordinates.x + sizes.width, 4), coordinates.y + sizes.height],
              [Draw.removePixels(coordinates.x + sizes.width, 4), coordinates.y + sizes.height - this.edgeSize],
              [Draw.addPixels(coordinates.x, 3), coordinates.y + sizes.height - this.edgeSize],
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

    if (this.orientationIs([MoveOrientation.vertical, MoveOrientation.full, MoveOrientation.up])) {
      if (keysPressed.up) {
        this.setCoordinates({ y: coordinates.y - this.speed });
        return;
      }
    }

    if (this.orientationIs([MoveOrientation.vertical, MoveOrientation.full, MoveOrientation.down])) {
      if (keysPressed.down) {
        this.setCoordinates({ y: coordinates.y + this.speed });
        return;
      }
    }

    if (this.orientationIs([MoveOrientation.horizontal, MoveOrientation.full, MoveOrientation.left])) {
      if (keysPressed.left) {
        this.orientation = Orientation.left;
        this.setCoordinates({ x: coordinates.x - this.speed });
        this.isMoving = true;
        return;
      }
    }

    if (this.orientationIs([MoveOrientation.horizontal, MoveOrientation.full, MoveOrientation.right])) {
      if (keysPressed.right) {
        this.orientation = Orientation.right;
        this.setCoordinates({ x: coordinates.x + this.speed });
        this.isMoving = true;
        return;
      }
    }

    this.isMoving = false;
  };

  private gravityEffect = () => {
    const coordinates = this.getCoordinates();
    const acceleration = this.getAcceleration();
    const accelerationPower = this.gravity.getAccelerationPower();
    const gravityPower = this.gravity.getGravityPower();

    const canGravity = (
      !this.isOnGround &&
      !this.isJump &&
      this.orientationOnlyIs([MoveOrientation.horizontal, MoveOrientation.left, MoveOrientation.right])
    );

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

  public effects = () => {
    this.gravityEffect();
    this.checkCanMove();
    this.setIsOnGround(false);

    this.canBoundary = !this.orientationIs([
      MoveOrientation.vertical,
      MoveOrientation.down,
      MoveOrientation.up,
    ]);

    this.setMoveOrientation([MoveOrientation.horizontal]);
  };
}

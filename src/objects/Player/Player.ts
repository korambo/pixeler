import { Inputs } from '@effects/Inputs';
import { MovingGameObject, MovingGameObjectProps } from '@objects/base/MovingGameObject';
// import { outerRectangle } from '@objects/__presets/boundaryCheck';
import { MoveOrientation, Orientation } from '@objects/types';

// import { Edge, TPolygon } from '@core/types';
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

  private sprite: { stay: Sprite; move: Sprite };

  public constructor(props: PlayerProps) {
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

  public draw = () => {
    const coordinates = this.getCoordinates();

    if (!this.sprite) {
      this.initSprite();
    }

    if (this.physic.isMoving && this.physic.onGround) {
      this.animation
        .sprite(this.sprite.move, SpriteAnimationOrientation.x, 12)
        .drawImage(coordinates, this.orientation === Orientation.left);
      return;
    }

    this.animation
      .sprite(this.sprite.stay, SpriteAnimationOrientation.x, 18)
      .drawImage(coordinates, this.orientation === Orientation.left);
  };

  private jump = () => {
    const keysPressed = this.inputs.getKeysPressed();

    this.physic.jump(keysPressed.jump);
  };

  private move = () => {
    const keysPressed = this.inputs.getKeysPressed();

    if (keysPressed.left) {
      this.orientation = Orientation.left;
      this.physic.moveX(MoveOrientation.left);
      return;
    }

    if (keysPressed.right) {
      this.orientation = Orientation.right;
      this.physic.moveX(MoveOrientation.right);
      return;
    }

    this.physic.stopX();
  };

  public animate = () => {};

  public inputEffects = () => {
    this.move();
    this.jump();
  };
}

import { Draw } from '@core/Draw';
import { Options } from '@core/Options';
import { Interaction, InteractionProps } from '@objects/base/Interaction';
import { Physic } from '@effects/Physic';
import { MovingGameObject } from '@objects/base/MovingGameObject';
import { Player } from '@objects/Player';
import { MoveOrientation } from '@objects/types';

interface StairsProps extends InteractionProps {
  count?: number;
}

const StairsHeight = 10;

export class Stairs extends Interaction {
  protected width = 15;
  protected height = null;

  protected interactionTime = 200;

  private yOrientation: MoveOrientation.up | MoveOrientation.down;
  private playerReadyInteract = false;
  private onStairs = false;

  private pattern: CanvasPattern;
  private readonly count: number;

  public constructor(props: StairsProps) {
    super(props);

    this._physic = new Physic({
      gravity: this.gravity,
      object: this,
      canCollision: false,
      canInteraction: true,
    });

    this.count = props.count || 1;

    this.setSizes({ height: Draw.getPixels(StairsHeight * this.count) });
  }

  private setPattern = () => {
    const img = this.imageLoader.getImage('stairs');
    this.pattern = Draw.getPattern(img, { width: this.width, height: StairsHeight });
  };

  public canInteract() {
    return this.playerReadyInteract;
  }

  public effects(moving?: MovingGameObject) {
    super.effects(moving);
    const isPlayer = moving instanceof Player;

    if (this.physic.playerIntersect) {
      this.playerReadyInteract = moving.physic.onGround;
      if (isPlayer) {
        const collision = this.physic.calcCollision(moving);
        this.yOrientation = collision.bottom > collision.top ? MoveOrientation.down : MoveOrientation.up;
        moving.physic.onStairs = this.onStairs;
        moving.physic.canMoving = { x: !this.onStairs, y: this.onStairs };
      }
    } else {
      if (isPlayer) {
        moving.physic.onStairs = false;
        moving.physic.canMoving = { x: true, y: false };
      }
      this.onStairs = false;
      this.playerReadyInteract = false;
    }
  }

  public animate = () => {};

  public draw() {
    const { ctx } = Options.getCanvasOptions();
    const sizes = this.getSizes();
    const coordinates = this.getCoordinates();

    if (!this.pattern) {
      this.setPattern();
    }

    ctx.beginPath();
    ctx.fillStyle = this.pattern;
    ctx.fillRect(coordinates.x, coordinates.y, sizes.width, sizes.height);
    ctx.fill();
  }

  public inputEffects = () => {
    const keysPressed = this.inputs.getKeysPressed();

    if (this.canInteract()) {
      if (
        (this.yOrientation === MoveOrientation.up && keysPressed.up) ||
        (this.yOrientation === MoveOrientation.down && keysPressed.down)
      ) {
        this.onStairs = true;
      }
    }
  };
}

import { MovingGameObject } from '@objects/base/MovingGameObject';
import { atRectangle, canInteraction } from '@objects/__presets/boundaryCheck';
import { Rectangle } from '@geometry/Rectangle';

import { Interaction, InteractionProps } from '@objects/base/Interaction';
import { Player } from '@objects/Player/Player';
import { Draw, DrawParams } from '@core/Draw';

import { drawEmpty, drawOpened, drawClosed } from '@objects/Chest/draw';
import { Options } from '@core/Options';

interface ChestProps extends InteractionProps {
  open?: boolean;
  empty?: boolean;
}

export class Chest extends Interaction {
  protected width = 18;
  protected height = 15;

  protected interactionTime = 200;
  protected interactionPaddings = { left: 40, right: 40, top: -Draw.getPixels(1) };

  private canLoot: boolean = false;
  private canOpen: boolean = false;
  private open: boolean = false;
  private empty: boolean = false;

  constructor(props: ChestProps) {
    super(props);

    if (typeof props.open !== 'undefined') this.open = props.open;
    if (typeof props.empty !== 'undefined') this.empty = props.empty;
  }

  public boundaryCheck(movingObject: MovingGameObject) {
    if (!this.open) {
      atRectangle(this, movingObject);
    }

    if (movingObject instanceof Player) {
      this.canOpen = !this.open && canInteraction(this, movingObject, this.interactionPaddings);
      this.canLoot = this.open && !this.empty && canInteraction(this, movingObject, this.interactionPaddings);
    }
  }

  private openChest = () => {
    this.open = true;
  };

  private lootChest = () => {
    this.empty = true;
  };

  // TODO вынести
  private drawHelper = () => {
    const { ctx, cellSize } = Options.getCanvasOptions();

    const coordinates = this.getCoordinates();
    const sizes = this.getSizes();

    const parts = [
      new Rectangle({
        width: 15 * cellSize,
        height: 10 * cellSize,
        x: coordinates.x + cellSize * 2,
        y: coordinates.y - cellSize * 18,
        color: '#b75d2a',
        filled: true,
      }),
      new Rectangle({
        width: 15 * cellSize,
        height: 10 * cellSize,
        x: coordinates.x + cellSize * 2,
        y: coordinates.y - cellSize * 18,
        color: '#47300e',
      }),
    ];

    parts.forEach((part) => part.draw());

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.fillText('F', coordinates.x + sizes.width / 2 - 4, coordinates.y - cellSize * 12);
    ctx.fill();
  };

  public draw() {
    const params: DrawParams = {
      coordinates: this.getCoordinates(),
      sizes: this.getSizes(),
    };

    if (this.canOpen || this.canLoot) this.drawHelper();

    if (this.empty && this.open) {
      drawEmpty(params);
      return;
    }

    this.open ? drawOpened(params) : drawClosed(params);
  }

  public inputEffects = () => {
    const keysPressed = this.inputs.getKeysPressed();

    if (!this.canInteract()) return;

    if (keysPressed.action) {
      if (this.canOpen) {
        this.setInteractionTimeout();
        this.openChest();
      }

      if (this.canLoot) {
        this.lootChest();
      }
    }
  };
}

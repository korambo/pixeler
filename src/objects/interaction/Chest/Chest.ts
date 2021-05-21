import { MovingGameObject } from '@objects/base/MovingGameObject';
import { topIntersect, canInteraction } from '@objects/__presets/boundaryCheck';
import { Sprite } from '@core/Sprite';

import { Interaction, InteractionProps } from '@objects/base/Interaction';
import { Player } from '@objects/Player';
import { Draw } from '@core/Draw';

interface ChestProps extends InteractionProps {
  open?: boolean;
  empty?: boolean;
}

export class Chest extends Interaction {
  protected width = 18;
  protected height = 20;

  protected interactionTime = 200;
  protected interactionPaddings = { left: 40, right: 40, top: -Draw.getPixels(1) };

  private canLoot: boolean = false;
  private canOpen: boolean = false;
  private open: boolean = false;
  private empty: boolean = false;

  private sprite: Sprite;

  constructor(props: ChestProps) {
    super(props);

    if (typeof props.open !== 'undefined') this.open = props.open;
    if (typeof props.empty !== 'undefined') this.empty = props.empty;
  }

  private initSprite = () => {
    this.sprite = new Sprite({
      image: this.imageLoader.getImage('chest_sprite.png'),
      frameSize: this.getOriginalSizes(),
    });
  };

  private openChest = () => {
    this.open = true;
  };

  private lootChest = () => {
    this.empty = true;
  };

  public animate = () => {};

  public boundaryCheck(movingObject: MovingGameObject) {
    if (!this.open) {
      topIntersect(this, movingObject);
    }

    if (movingObject instanceof Player) {
      this.canOpen = !this.open && canInteraction(this, movingObject, this.interactionPaddings);
      this.canLoot = this.open && !this.empty && canInteraction(this, movingObject, this.interactionPaddings);
    }
  }

  public draw() {
    const coordinates = this.getCoordinates();

    if (!this.sprite) {
      this.initSprite();
    }

    if (this.canOpen || this.canLoot) this.info.draw();

    if (this.empty && this.open) {
      this.sprite.drawFrame([1, 0], coordinates);
      return;
    }

    this.open
      ? this.sprite.drawFrame([2, 0], coordinates)
      : this.sprite.drawFrame([0, 0], coordinates);
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

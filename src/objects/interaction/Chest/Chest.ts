import { MovingGameObject } from '@objects/base/MovingGameObject';
import { Sprite } from '@core/Assets/Sprite';

import { Interaction, InteractionProps } from '@objects/base/Interaction';

interface ChestProps extends InteractionProps {
  open?: boolean;
  empty?: boolean;
}

export class Chest extends Interaction {
  protected width = 18;
  protected height = 20;

  protected interactionTime = 200;

  private canLoot: boolean = false;
  private canOpen: boolean = false;
  private open: boolean = false;
  private empty: boolean = false;

  public constructor(props: ChestProps) {
    super(props);

    if (typeof props.open !== 'undefined') this.open = props.open;
    if (typeof props.empty !== 'undefined') this.empty = props.empty;
  }

  private openChest = () => {
    this.open = true;
  };

  private lootChest = () => {
    this.empty = true;
  };

  public animate = () => {};

  public effects(moving?: MovingGameObject) {
    super.effects(moving);

    this.canOpen = !this.open && this.physic.playerIntersect;
    this.canLoot = this.open && !this.empty && this.physic.playerIntersect;
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

  public init() {
    super.init();

    this.sprite = {
      base: new Sprite({
        image: this.assetsLoader.getImage('chest_sprite'),
        frameSize: {
          width: this.width,
          height: this.height,
        },
      }),
    };
  }

  public draw() {
    const { base } = this.sprite;
    const coordinates = this.getCoordinates();

    if (this.canOpen || this.canLoot) this.info.draw();

    if (this.empty && this.open) {
      base.drawFrame([1, 0], coordinates);
      return;
    }

    this.open
      ? base.drawFrame([2, 0], coordinates)
      : base.drawFrame([0, 0], coordinates);
  }
}

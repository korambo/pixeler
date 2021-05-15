import { MovingGameObject } from '@objects/base/MovingGameObject';
import { atRectangle, canInteraction } from '@objects/__presets/boundaryCheck';
import { Rectangle } from '@geometry/Rectangle';

import { Interaction, InteractionProps } from '@objects/base/Interaction';
import { Player } from '@objects/Player/Player';
import { Draw, DrawParams } from '@core/Draw';

import { drawEmpty, drawOpened, drawClosed } from '@objects/Chest/draw';
import { Options } from '@core/Options';

import HeartPng from '@assets/Heart.png';

// interface HeartProps extends InteractionProps {
// }

export class Heart extends Interaction {
  protected width = 18;
  protected height = 15;

  protected interactionTime = 200;
  protected interactionPaddings = { left: 40, right: 40, top: -Draw.getPixels(1) };

  private canLoot: boolean = false;
  private canOpen: boolean = false;
  private open: boolean = false;
  private empty: boolean = false;

  public boundaryCheck(movingObject: MovingGameObject) {
    if (movingObject instanceof Player) {
      this.canOpen = !this.open && canInteraction(this, movingObject, this.interactionPaddings);
      this.canLoot = this.open && !this.empty && canInteraction(this, movingObject, this.interactionPaddings);
    }
  }

  public draw() {
    const coordinates = this.getCoordinates();

    Draw.drawImage(HeartPng, coordinates);
  }

  public inputEffects = () => {
    // const keysPressed = this.inputs.getKeysPressed();
    //
    // if (!this.canInteract()) return;
    //
    // if (keysPressed.action) {
    //   if (this.canOpen) {
    //     this.setInteractionTimeout();
    //     this.openChest();
    //   }
    //
    //   if (this.canLoot) {
    //     this.lootChest();
    //   }
    // }
  };
}

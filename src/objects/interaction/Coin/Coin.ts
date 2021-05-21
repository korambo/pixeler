import { MovingGameObject } from '@objects/base/MovingGameObject';
import { canInteraction } from '@objects/__presets/boundaryCheck';

import { Interaction } from '@objects/base/Interaction';
import { Player } from '@objects/Player';
import { Draw } from '@core/Draw';

export class Coin extends Interaction {
  protected width = 7;
  protected height = 7;

  protected interactionTime = 200;
  protected interactionPaddings = { top: -10, right: -5, bottom: -5, left: -10 };

  private looted: boolean = false;

  private lootCoin = () => {
    this.looted = true;
  };

  public boundaryCheck(movingObject: MovingGameObject) {
    if (movingObject instanceof Player) {
      if (!this.looted) {
        if (canInteraction(this, movingObject, this.interactionPaddings)) {
          this.lootCoin();
        }
      }
    }
  }

  public animate = () => {
    this.animation.floatingY(30);
  };

  public draw() {
    const coordinates = this.getCoordinates();
    const img = this.imageLoader.getImage('coin.png');

    if (!this.looted) {
      Draw.drawImage(img, coordinates, this.getSizes());
    }
  }

  public inputEffects = () => {};
}

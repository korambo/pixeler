import { MovingGameObject } from '@objects/base/MovingGameObject';
import { canInteraction } from '@objects/__presets/boundaryCheck';

import { Interaction } from '@objects/base/Interaction';
import { Player } from '@objects/Player';
import { Draw } from '@core/Draw';

// interface HeartProps extends InteractionProps {
// }

export class Heart extends Interaction {
  protected width = 11;
  protected height = 10;

  protected interactionTime = 200;
  protected interactionPaddings = { left: -10, right: -10 };

  private looted: boolean = false;
  private canLoot: boolean = false;

  private lootHeart = () => {
    this.looted = true;
  };

  public boundaryCheck(movingObject: MovingGameObject) {
    if (movingObject instanceof Player) {
      if (!this.looted) {
        if (canInteraction(this, movingObject, this.interactionPaddings)) {
          this.lootHeart();
        }
      }
    }
  }

  public animate = () => {
    this.animation.floatingY(40);
  };

  public draw() {
    const coordinates = this.getCoordinates();
    const img = this.imageLoader.getImage('heart');

    if (!this.looted) {
      if (this.canLoot) this.info.draw();

      Draw.drawImage(img, coordinates, this.getSizes());
    }
  }

  public inputEffects = () => {};
}

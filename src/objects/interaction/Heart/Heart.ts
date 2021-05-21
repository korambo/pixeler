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
  protected interactionPaddings = { left: 40, right: 40 };

  private looted: boolean = false;
  private canLoot: boolean = false;

  private lootHeart = () => {
    this.looted = true;
  };

  public boundaryCheck(movingObject: MovingGameObject) {
    if (movingObject instanceof Player) {
      if (!this.looted) {
        this.canLoot = canInteraction(this, movingObject, this.interactionPaddings);
      }
    }
  }

  public animate = () => {
    this.animation.floatingY(40);
  };

  public draw() {
    const coordinates = this.getCoordinates();
    const img = this.imageLoader.getImage('heart.png');

    if (!this.looted) {
      if (this.canLoot) this.info.draw();

      Draw.drawImage(img, coordinates, this.getSizes());
    }
  }

  public inputEffects = () => {
    const keysPressed = this.inputs.getKeysPressed();

    if (!this.canInteract()) return;

    if (keysPressed.action) {
      if (this.canLoot) {
        this.lootHeart();
      }
    }
  };
}

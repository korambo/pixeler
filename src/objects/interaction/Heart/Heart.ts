import { MovingGameObject } from '@objects/base/MovingGameObject';

import { Interaction } from '@objects/base/Interaction';
import { Draw } from '@core/Draw';

// interface HeartProps extends InteractionProps {
// }

export class Heart extends Interaction {
  protected width = 11;
  protected height = 10;

  protected interactionTime = 200;

  private looted: boolean = false;
  private canLoot: boolean = false;

  private lootHeart = () => {
    this.looted = true;
  };

  public effects(moving?: MovingGameObject) {
    super.effects(moving);

    if (this.physic.playerIntersect) {
      if (!this.looted) {
        this.lootHeart();
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

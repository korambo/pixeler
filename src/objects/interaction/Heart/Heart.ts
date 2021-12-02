import { MovingGameObject } from '@objects/base/MovingGameObject';

import { Interaction } from '@objects/base/Interaction';
import { Draw } from '@core/Draw';
import { Player } from '@objects/special/Player';

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
        if (moving instanceof Player) {
          const resHealth = moving.health + 15;

          if (resHealth > moving.maxHealth) {
            moving.health = moving.maxHealth;
          } else {
            moving.health = resHealth;
          }
        }
      }
    }
  }

  public animate = () => {
    this.animation.floatingY(40);
  };

  public inputEffects = () => {};

  // eslint-disable-next-line class-methods-use-this
  public init() {}

  public draw() {
    const coordinates = this.getCoordinates();
    const img = this.assetsLoader.getImage('heart');

    if (!this.looted) {
      if (this.canLoot) this.info.draw();

      Draw.drawImage(img, coordinates, this.getSizes());
    }
  }
}

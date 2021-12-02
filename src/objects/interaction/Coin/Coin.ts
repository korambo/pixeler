import { MovingGameObject } from '@objects/base/MovingGameObject';

import { Interaction } from '@objects/base/Interaction';
import { Draw } from '@core/Draw';

export class Coin extends Interaction {
  protected width = 7;
  protected height = 7;

  protected interactionTime = 200;

  private looted: boolean = false;

  private lootCoin = () => {
    this.looted = true;
  };

  public effects(moving?: MovingGameObject) {
    super.effects(moving);

    if (this.physic.playerIntersect) {
      if (!this.looted) {
        this.lootCoin();
      }
    }
  }

  public animate = () => {
    this.animation.floatingY(30);
  };

  public inputEffects = () => {};

  // eslint-disable-next-line class-methods-use-this
  public init() {}

  public draw() {
    const coordinates = this.getCoordinates();
    const img = this.assetsLoader.getImage('coin');

    if (!this.looted) {
      Draw.drawImage(img, coordinates, this.getSizes());
    }
  }
}

import { Decoration } from '@objects/base/Decoration';
import { Sprite } from '@core/Sprite';
import { SpriteAnimationOrientation } from '@core/Animation/types';

export class Bonfire extends Decoration {
  protected width = 24;
  protected height = 24;

  private sprite: Sprite;

  private initSprite = () => {
    const frameSize = { width: this.width, height: this.height };

    this.sprite = new Sprite({
      image: this.imageLoader.getImage('bonfire_sprite'),
      frameSize,
    });
  };

  public draw() {
    if (!this.sprite) {
      this.initSprite();
    }

    this.animation
      .sprite(this.sprite, SpriteAnimationOrientation.x, 18)
      .drawImage(this.getCoordinates());
  }
}

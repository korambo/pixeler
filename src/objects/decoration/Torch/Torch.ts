import { Decoration } from '@objects/base/Decoration';
import { Sprite } from '@core/Sprite';
import { SpriteAnimationOrientation } from '@core/Animation/types';

export class Torch extends Decoration {
  protected width = 12;
  protected height = 12;

  private sprite: Sprite;

  private initSprite = () => {
    const frameSize = { width: this.width, height: this.height };

    this.sprite = new Sprite({
      image: this.imageLoader.getImage('torch_sprite'),
      frameSize,
    });
  };

  public draw() {
    if (!this.sprite) {
      this.initSprite();
    }

    this.animation
      .sprite(this.sprite, SpriteAnimationOrientation.x, 20)
      .drawImage(this.getCoordinates());
  }
}

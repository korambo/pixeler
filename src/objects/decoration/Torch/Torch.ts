import { Decoration } from '@objects/base/Decoration';
import { Sprite } from '@core/Sprite';
import { SpriteAnimationOrientation } from '@core/Animation/types';

export class Torch extends Decoration {
  width = 12;
  height = 12;

  sprite: Sprite;

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

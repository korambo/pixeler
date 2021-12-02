import { Decoration } from '@objects/base/Decoration';
import { Sprite } from '@core/Assets/Sprite';
import { SpriteAnimationOrientation } from '@core/Animation/types';

export class Bonfire extends Decoration {
  protected width = 24;
  protected height = 24;

  public init() {
    const frameSize = { width: this.width, height: this.height };

    this.sprite = {
      base: new Sprite({
        image: this.assetsLoader.getImage('bonfire_sprite'),
        frameSize,
      }),
    };
  }

  public draw() {
    const { base } = this.sprite;

    this.animation
      .sprite(base, SpriteAnimationOrientation.x, 18)
      .drawImage(this.getCoordinates());
  }
}

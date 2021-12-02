import { Decoration } from '@objects/base/Decoration';
import { Sprite } from '@core/Assets/Sprite';
import { SpriteAnimationOrientation } from '@core/Animation/types';

export class Torch extends Decoration {
  protected width = 12;
  protected height = 12;

  public init() {
    const frameSize = { width: this.width, height: this.height };

    this.sprite = {
      base: new Sprite({
        image: this.assetsLoader.getImage('torch_sprite'),
        frameSize,
      }),
    };
  }

  public draw() {
    const { base } = this.sprite;

    this.animation
      .sprite(base, SpriteAnimationOrientation.x, 20)
      .drawImage(this.getCoordinates());
  }
}

import { Sprite } from '@core/Assets/Sprite';
import { SpriteAnimationOrientation } from '@core/Animation/types';
import { GameObject } from '@objects/base/GameObject';
import { Decoration } from '@objects/base/Decoration';

// interface AnimationProps {
//
// }

export class Animation {
  private object: GameObject|Decoration;

  private clearTimeout: Record<string, NodeJS.Timeout> = {};
  private counter: Record<string, number> = {};

  public constructor(object: GameObject|Decoration) {
    this.object = object;
  }

  private resetCounter = (name: string) => {
    this.clearTimeout[name] = undefined;
    this.counter[name] = undefined;
  };

  private timer = (name: string) => {
    if (this.clearTimeout[name]) clearTimeout(this.clearTimeout[name]);
    this.clearTimeout[name] = setTimeout(() => this.resetCounter(name), 200);
  };

  private setCounter = (name: string, value: number) => {
    this.counter[name] = value;
  };

  private increaseCounter = (name: string) => {
    if (typeof this.counter[name] === 'undefined') this.counter[name] = 0;
    this.counter[name] += 1;
  };

  private getCounter = (name: string) => this.counter[name];

  /**
   * Returns one of the sprite elements every stepTime
   *
   * @param sprite
   * @param orientation
   * @param stepTime
   */
  public sprite = (sprite: Sprite, orientation: SpriteAnimationOrientation, stepTime: number) => {
    const animationName = `sprite_${sprite.getId()}`;

    this.timer(animationName);

    this.increaseCounter(animationName);

    const { x, y } = sprite.getFramesCount();

    const spriteLength = orientation === SpriteAnimationOrientation.x ? x : y;

    if (this.getCounter(animationName) === spriteLength * stepTime) {
      this.setCounter(animationName, 0);
    }

    switch (orientation) {
      case SpriteAnimationOrientation.x: {
        return sprite.getFrame([Math.floor(this.getCounter(animationName) / stepTime), 0]);
      }
      case SpriteAnimationOrientation.y: {
        return sprite.getFrame([0, Math.floor(this.getCounter(animationName) / stepTime)]);
      }
    }
  };

  public floatingY = (stepTime: number) => {
    const animationName = 'floatingY';
    const { y } = this.object.getCoordinates();

    const counter = this.getCounter(animationName);

    if (counter < stepTime) {
      if (counter % 2) this.object.setCoordinates({ y: y - 1 });
      this.setCounter(animationName, counter + 1);
    } else if (counter < stepTime * 2) {
      if (counter % 2) this.object.setCoordinates({ y: y + 1 });
      this.setCounter(animationName, counter + 1);
    } else {
      this.setCounter(animationName, 0);
    }
  };
}

import { Weapon, WeaponProps } from '@objects/base/Weapon';
import { Sprite } from '@core/Assets/Sprite';
import { WeaponSize } from '@objects/constants';
import { SubjectAction } from '@objects/base/Subject/constants';
import { SpriteAnimationOrientation } from '@core/Animation/types';
import { Orientation } from '@objects/types';

interface HammerProps extends Omit<WeaponProps, 'size'> {}

export class Hammer extends Weapon {
  public constructor(props: HammerProps) {
    super({ ...props, size: WeaponSize.m });
  }

  public init() {
    const frameSize = { width: this.width, height: this.height };

    this.sprite = {
      stay: new Sprite({
        image: this.assetsLoader.getImage('hammer_stay_sprite'),
        frameSize,
        canFlip: true,
      }),
      move: new Sprite({
        image: this.assetsLoader.getImage('hammer_move_sprite'),
        frameSize,
        canFlip: true,
      }),
      attack: new Sprite({
        image: this.assetsLoader.getImage('hammer_attack_sprite'),
        frameSize,
        canFlip: true,
      }),
    };
  }

  public draw() {
    const coordinates = this.getWeaponCoordinates();
    const { action, orientation } = this.subject.state.get();
    const canFlip = orientation === Orientation.left;

    switch (action) {
      case SubjectAction.attack: {
        this.animation
          .sprite(this.sprite[SubjectAction.attack], SpriteAnimationOrientation.x, 4)
          .drawImage(coordinates, canFlip);
        break;
      }
      case SubjectAction.move: {
        this.animation
          .sprite(this.sprite[SubjectAction.move], SpriteAnimationOrientation.x, 12)
          .drawImage(coordinates, canFlip);
        break;
      }
      case SubjectAction.stay: {
        this.animation
          .sprite(this.sprite[SubjectAction.stay], SpriteAnimationOrientation.x, 18)
          .drawImage(coordinates, canFlip);
        break;
      }
    }
  }
}

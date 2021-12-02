import { Enemy, EnemyProps } from '@objects/base/Enemy/Enemy';
import { Orientation } from '@objects/types';

import { Sprite } from '@core/Assets/Sprite';
import { SpriteAnimationOrientation } from '@core/Animation/types';
import { MovingGameObject } from '@objects/base/MovingGameObject';
import { Draw } from '@core/Draw';
import { SubjectPhysic } from '@physic/SubjectPhysic';
import { SubjectAction } from '@objects/base/Subject/constants';
import { SubjectSize } from '@objects/constants';
import { Sword } from '@objects/weapon/Sword';
import { Axe } from '@objects/weapon/Axe';
import { Hammer } from '@objects/weapon/Hammer';

interface OrcProps extends Omit<EnemyProps, 'size'> {}

export class Orc extends Enemy {
  protected width = 18;
  protected height = 28;

  protected _attackTimeout = 2000;
  protected _health = 30;
  protected _damage = 5;
  protected _viewPadding = { x: 40, y: 0 };
  protected _damageIndent = { x: 15, y: 0 };

  public constructor(props: OrcProps) {
    super({
      ...props,
      size: SubjectSize.m,
    });

    const random = Math.floor(Math.random() * 3);

    const RandomWeapon = [
      Axe,
      Sword,
      Hammer,
    ];

    this._weapon = new (RandomWeapon[random])({
      assetsLoader: this.assetsLoader,
      animation: this.animation,
      subject: this,
      x: this.x,
      y: this.y,
    });

    this._physic = new SubjectPhysic({
      gravity: this.gravity,
      object: this,
      canCollision: true,
      canInteraction: true,
      speed: Draw.getPixels(0.6),
    });
  }

  public effects(moving?: MovingGameObject) {
    super.effects(moving);
    const { aiAction } = this.state.get();

    if (aiAction.watch) {
      this.ai.watch(aiAction.watch);
    }
  }

  public animate = () => {};

  public init() {
    super.init();
    const frameSize = { width: this.width, height: this.height };

    this.sprite = {
      [SubjectAction.die]: new Sprite({
        image: this.assetsLoader.getImage('orc_death_sprite'),
        frameSize: { width: 28, height: 28 },
        canFlip: true,
      }),
      [SubjectAction.attack]: new Sprite({
        image: this.assetsLoader.getImage('orc_attack_sprite'),
        frameSize: { width: 32, height: 32 },
        canFlip: true,
      }),
      [SubjectAction.stay]: new Sprite({
        image: this.assetsLoader.getImage('orc_stay_sprite'),
        frameSize,
        canFlip: true,
      }),
      [SubjectAction.move]: new Sprite({
        image: this.assetsLoader.getImage('orc_move_sprite'),
        frameSize,
        canFlip: true,
      }),
    };
  }

  public draw = () => {
    const { orientation, action } = this.state.get();
    const coordinates = this.getCoordinates();
    const canFlip = orientation === Orientation.left;

    switch (action) {
      case SubjectAction.move: {
        this.animation
          .sprite(this.sprite.move, SpriteAnimationOrientation.x, 12)
          .drawImage(coordinates, canFlip);
        break;
      }
      case SubjectAction.dead: {
        this.physic.stopX();
        this.sprite.die.drawFrame(
          [6, 0],
          { x: coordinates.x - 22, y: coordinates.y },
          canFlip,
        );
        return;
      }
      case SubjectAction.die: {
        this.animation
          .sprite(this.sprite.die, SpriteAnimationOrientation.x, 10)
          .drawImage({ x: coordinates.x - 22, y: coordinates.y }, canFlip);
        break;
      }
      case SubjectAction.attack: {
        this.animation
          .sprite(this.sprite.attack, SpriteAnimationOrientation.x, 4)
          .drawImage({ x: coordinates.x - 28, y: coordinates.y - 16 }, canFlip);
        break;
      }
      case SubjectAction.stay: {
        this.animation
          .sprite(this.sprite.stay, SpriteAnimationOrientation.x, 18)
          .drawImage(coordinates, canFlip);
      }
    }

    super.draw();
  };
}

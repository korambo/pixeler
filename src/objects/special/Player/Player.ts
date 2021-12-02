import { Inputs } from '@core/Inputs';
import { Physic } from '@physic/Physic';
import { Subject, SubjectProps } from '@objects/base/Subject';
import { MoveOrientation, Orientation } from '@objects/types';

import { Sprite } from '@core/Assets/Sprite';
import { SpriteAnimationOrientation } from '@core/Animation/types';
import { Enemy } from '@objects/base/Enemy/Enemy';
import { SubjectAction } from '@objects/base/Subject/constants';
import { SubjectSize } from '@objects/constants';
import { Hammer } from '@objects/weapon/Hammer';

interface PlayerProps extends Omit<SubjectProps, 'size'> {
  inputs: Inputs;
  enemies: Enemy[];
}

export class Player extends Subject {
  protected width = 18;
  protected height = 24;

  protected _attackTimeout = 500;
  protected _health = 200;
  protected _damage = 10;
  protected _damageIndent = { x: 15, y: 0 };
  protected enemies: Enemy[];

  private inputs: Inputs;

  public constructor(props: PlayerProps) {
    super({
      ...props,
      size: SubjectSize.s,
    });

    this._weapon = new Hammer({
      assetsLoader: this.assetsLoader,
      animation: this.animation,
      subject: this,
      x: this.x,
      y: this.y,
    });

    this.inputs = props.inputs;
    this.enemies = props.enemies;
  }

  private attack() {
    const keysPressed = this.inputs.getKeysPressed();

    if (keysPressed.attack && !this.isAttacks && this.canAttack) {
      this.enemies.forEach(((item) => {
        setTimeout(() => {
          const canDamage = Physic.polygonsIntersect(this.getDamagePolygon(), item.getPolygon());

          if (canDamage) {
            const collision = Physic.polygonsCollision(this.getDamagePolygon(), item.getPolygon());

            item.takeDamage(this.damage);
            item.damaged = {
              active: true,
              orientation: collision.left > collision.right ? Orientation.left : Orientation.right,
            };
          }
        }, 300);
      }));
      this.isAttacks = true;
      this.canAttack = false;
      this.state.set({ action: SubjectAction.attack });
      setTimeout(() => { this.canAttack = true; }, this.attackTimeout);
      setTimeout(() => {
        this.isAttacks = false;
        if (this.state.get().action === SubjectAction.attack) {
          this.state.set({ action: SubjectAction.stay });
        }
      }, 500);
    }
  }

  private jump = () => {
    const keysPressed = this.inputs.getKeysPressed();

    this.physic.jump(keysPressed.jump);
  };

  private move = () => {
    const keysPressed = this.inputs.getKeysPressed();

    if (this.physic.canMoving.y) {
      this.physic.stopX();

      if (keysPressed.up) {
        this.physic.moveY(MoveOrientation.up);
        return;
      }

      if (keysPressed.down) {
        this.physic.moveY(MoveOrientation.down);
        return;
      }
    }

    if (this.physic.canMoving.x && !this.isAttacks) {
      this.physic.stopY();

      if (keysPressed.left) {
        this.physic.moveX(MoveOrientation.left);
        return;
      }

      if (keysPressed.right) {
        this.physic.moveX(MoveOrientation.right);
        return;
      }
    }

    this.physic.stop();
  };

  public animate = () => {};

  public inputEffects = () => {
    this.move();
    this.jump();
    this.attack();
  };

  public init() {
    super.init();
    const frameSize = { width: this.width, height: this.height };

    this.sprite = {
      [SubjectAction.stay]: new Sprite({
        image: this.assetsLoader.getImage('player_stay_sprite'),
        frameSize,
        canFlip: true,
      }),
      [SubjectAction.move]: new Sprite({
        image: this.assetsLoader.getImage('player_move_sprite'),
        frameSize,
        canFlip: true,
      }),
      [SubjectAction.attack]: new Sprite({
        image: this.assetsLoader.getImage('player_attack_sprite'),
        frameSize,
        canFlip: true,
      }),
    };
  }

  public draw = () => {
    const coordinates = this.getCoordinates();
    const { action, orientation } = this.state.get();
    const canFlip = orientation === Orientation.left;

    switch (action) {
      case SubjectAction.attack: {
        this.animation
          .sprite(this.sprite[SubjectAction.attack], SpriteAnimationOrientation.x, 4)
          .drawImage(coordinates, canFlip);
        break;
      }
      case SubjectAction.stay: {
        this.animation
          .sprite(this.sprite[SubjectAction.stay], SpriteAnimationOrientation.x, 18)
          .drawImage(coordinates, canFlip);
        break;
      }
      case SubjectAction.move: {
        this.animation
          .sprite(this.sprite[SubjectAction.move], SpriteAnimationOrientation.x, 12)
          .drawImage(coordinates, canFlip);
      }
    }

    super.draw();
  };
}

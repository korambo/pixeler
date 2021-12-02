import { MovingGameObject, MovingGameObjectProps } from '@objects/base/MovingGameObject';
import { HealthBar } from '@objects/interface/HealthBar';
import { SubjectPhysic } from '@physic/SubjectPhysic';
import { TCoordinates, TPolygon } from '@core/types';
import { Orientation } from '@objects/types';
import { Draw } from '@core/Draw';
import { EffectOptions } from '@effects/types';
import { Sprite } from '@core/Assets/Sprite';
import { Weapon } from '@objects/base/Weapon';
import { State } from '@core/State';
import { SubjectAction } from '@objects/base/Subject/constants';
import { SpriteAnimationOrientation } from '@core/Animation/types';
import { SubjectSize, SubjectSizes } from '@objects/constants';
import { Rectangle } from '@geometry/Rectangle';

export interface SubjectProps extends MovingGameObjectProps {
  size: SubjectSize;
}

export abstract class Subject extends MovingGameObject {
  protected width = null;
  protected height = null;

  protected _size: SubjectSize;

  private healthBar: HealthBar;
  protected _physic: SubjectPhysic;

  protected _state: State<any>;
  protected _weapon: Weapon;
  protected sprite: Partial<Record<SubjectAction, Sprite>>;

  protected abstract _attackTimeout: number;
  protected abstract _health: number;
  protected abstract _damage: number;
  protected abstract readonly _damageIndent: TCoordinates;
  protected _damaged: EffectOptions = {
    active: false,
    orientation: Orientation.left,
  };
  protected _maxHealth: number;
  protected _isAttacks: boolean;
  protected _canAttack = true;
  protected _isDead: boolean;
  public _isDies: boolean; // todo

  protected effectsSprite: Record<string, Sprite>;

  protected constructor(props: SubjectProps) {
    super(props);

    this._size = props.size;

    this.width = SubjectSizes[props.size].width;
    this.height = SubjectSizes[props.size].height;

    this._state = new State<any>({
      action: SubjectAction.stay,
      orientation: Orientation.right,
    });

    this._physic = new SubjectPhysic({
      gravity: this.gravity,
      object: this,
      canCollision: true,
      canInteraction: true,
    });
  }

  public get state() {
    return this._state;
  }

  public get physic() {
    return this._physic;
  }

  public get size() {
    return this._size;
  }

  public get attackTimeout() {
    return this._attackTimeout;
  }

  public get isDead() {
    return this._isDead;
  }

  public get maxHealth() {
    return this._maxHealth;
  }

  public set weapon(weapon: Weapon) {
    this._weapon = weapon;
  }

  public get health() {
    return this._health;
  }

  public set health(health) {
    this._health = health;
  }

  public get canAttack() {
    return this._canAttack;
  }

  public set canAttack(canAttack) {
    this._canAttack = canAttack;
  }

  public get isAttacks() {
    return this._isAttacks;
  }

  public set isAttacks(isAttacks) {
    this._isAttacks = isAttacks;
  }

  public get damaged() {
    return this._damaged;
  }

  public set damaged(damaged: Partial<EffectOptions>) {
    this._damaged = { ...this._damaged, ...damaged };
  }

  public get damage() {
    return this._damage;
  }

  public set damage(damage) {
    this._damage = damage;
  }

  public takeDamage(damage: number) {
    this.health -= damage;
  }

  public getDamagePolygon(): TPolygon {
    const { orientation } = this.state.get();
    const polygon = this.getPolygon();

    switch (orientation) {
      case Orientation.left: {
        new Rectangle({
          x: Draw.removePixels(polygon.x, this._damageIndent.x),
          y: polygon.y,
          width: Draw.addPixels(polygon.width, this._damageIndent.x),
          height: polygon.height,
        }).draw();

        return {
          x: Draw.removePixels(polygon.x, this._damageIndent.x),
          y: polygon.y,
          width: Draw.addPixels(polygon.width, this._damageIndent.x),
          height: polygon.height,
        };
      }
      case Orientation.right: {
        new Rectangle({
          x: polygon.x,
          y: polygon.y,
          width: Draw.addPixels(polygon.width, this._damageIndent.x),
          height: polygon.height,
        }).draw();

        return {
          x: polygon.x,
          y: polygon.y,
          width: Draw.addPixels(polygon.width, this._damageIndent.x),
          height: polygon.height,
        };
      }
    }
  }

  public effects(moving?: MovingGameObject) {
    if (!this._isDead && !this._isDies && !this._health) {
      this._isDies = true;
      this.state.set({ action: SubjectAction.die });
      setTimeout(() => {
        this._isDies = false;
        this._isDead = true;
        this.state.set({ action: SubjectAction.dead });
      }, 1000);
    }

    if (this._isDead || this._isDies) {
      return;
    }

    super.effects(moving);

    this.physic.damage(this._damaged);
    this.damaged = { active: false };
  }

  public init() {
    this.healthBar = new HealthBar({
      ...this.getCoordinates(),
      count: this.health,
      max: this.health,
      assetsLoader: this.assetsLoader,
    });

    this._maxHealth = this.health;

    this.effectsSprite = {
      blood: new Sprite({
        frameSize: { width: 19, height: 24 },
        image: this.assetsLoader.getImage('blood_sprite'),
      }),
      smoke: new Sprite({
        frameSize: { width: 19, height: 24 },
        image: this.assetsLoader.getImage('smoke_sprite'),
      }),
    };

    if (this._weapon) {
      this._weapon.init();
    }
  }

  public draw() {
    const { action } = this.state.get();

    this.healthBar.count = this.health;
    this.healthBar.setCoordinates(this.getCoordinates());
    this.healthBar.draw();

    if (this._weapon) {
      this._weapon.setCoordinates(this.getCoordinates());
      this._weapon.draw();
    }

    if (this.physic.damageOptions.active || action === SubjectAction.die) {
      this.animation
        .sprite(this.effectsSprite.blood, SpriteAnimationOrientation.x, 2)
        .drawImage(this.getCoordinates());
    }
  }
}

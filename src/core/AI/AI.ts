import { MoveOrientation, Orientation } from '@objects/types';
import { Draw } from '@core/Draw';
import { Player } from '@objects/special/Player';
import { Physic } from '@physic/Physic';
import { Enemy } from '@objects/base/Enemy/Enemy';
import { SubjectAction } from '@objects/base/Subject/constants';
import { State } from '@core/State';

export interface AIAction {
  watch?: number;
}

export interface AIProps {
  object: Enemy;
  player: Player;
}

export class AI {
  private object: Enemy;
  private player: Player;

  private playerFound = false;

  private state: State<any>;

  public constructor(props: AIProps) {
    this.state = new State<any>({
      watch: {},
    });
    this.object = props.object;
    this.player = props.player;
  }

  public attack() {
    const { action } = this.object.state.get();

    if (this.object.isAttacks || !this.object.canAttack) return;

    const canAttack = Physic.polygonsIntersect(this.object.getDamagePolygon(), this.player.getPolygon());

    if (canAttack && action !== SubjectAction.die && action !== SubjectAction.dead) {
      setTimeout(() => {
        const canDamage = Physic.polygonsIntersect(this.object.getDamagePolygon(), this.player.getPolygon());
        const collision = Physic.polygonsCollision(this.object.getDamagePolygon(), this.player.getPolygon());

        if (canDamage) {
          this.player.takeDamage(this.object.damage);
          this.player.damaged = {
            active: true,
            orientation: collision.left > collision.right ? Orientation.left : Orientation.right,
          };
        }
      }, 300);

      this.object.isAttacks = true;
      this.object.canAttack = false;
      this.object.state.set({ action: SubjectAction.attack });
      setTimeout(() => { this.object.canAttack = true; }, this.object.attackTimeout);
      setTimeout(() => {
        this.object.isAttacks = false;
        if (this.object.state.get().action === SubjectAction.attack) {
          this.object.state.set({ action: SubjectAction.stay });
        }
      }, 500);
    }
  }

  public findPlayer() {
    const found = Physic.polygonsIntersect(this.object.getViewPolygon(this.playerFound), this.player.getPolygon());
    const canMove = found && !this.object.isAttacks && !Physic.polygonsIntersect(
      this.object.getPolygon(),
      this.player.getPolygon(),
    );

    if (canMove && !this.object.damaged.active) {
      const collision = Physic.polygonsCollision(
        this.object.getViewPolygon(this.playerFound),
        this.player.getPolygon(),
      );

      this.object.physic.moveX(collision.left > collision.right ? MoveOrientation.left : MoveOrientation.right);
      this.playerFound = true;
      return;
    }

    this.playerFound = found || this.object.damaged.active;
    this.object.physic.stopX();
  }

  public watch(distance: number) {
    const { action: objectAction } = this.object.state.get();
    const action = 'watch';

    if (
      this.object.physic.damageOptions.active
      || this.playerFound
      || objectAction === SubjectAction.die
      || objectAction === SubjectAction.dead
    ) {
      return;
    }

    if (!this.state.get()[action]) {
      this.state.set({
        [action]: {
          start: this.object.getCoordinates(),
          orientation: Orientation.right,
        },
      });
    }

    const { start, orientation } = this.state.get()[action];
    const coordinates = this.object.getCoordinates();

    if (orientation === Orientation.right) {
      this.object.physic.moveX(MoveOrientation.right);
      // objectState.set({ orientation });

      if (coordinates.x >= start.x + Draw.getPixels(distance)) {
        this.state.set({ [action]: { orientation: Orientation.left } });
      }
    }

    if (orientation === Orientation.left) {
      this.object.physic.moveX(MoveOrientation.left);
      // objectState.set({ orientation });

      if (coordinates.x <= start.x) {
        this.state.set({ [action]: { orientation: Orientation.right } });
      }
    }
  }
}

import { Subject, SubjectProps } from '@objects/base/Subject';
import { AI } from '@core/AI';
import { Orientation } from '@objects/types';
import { MovingGameObject } from '@objects/base/MovingGameObject';
import { Player } from '@objects/special/Player';
import { TCoordinates, TPolygon } from '@core/types';
import { Draw } from '@core/Draw';
import { SubjectAction } from '@objects/base/Subject/constants';
import { State } from '@core/State';

export interface EnemyProps extends SubjectProps {
  state: Partial<any>;
  player: Player;
}

export abstract class Enemy extends Subject {
  private readonly _ai: AI;
  protected abstract _viewPadding: TCoordinates;
  protected _state: State<any>;

  protected constructor(props: EnemyProps) {
    super(props);

    this._state = new State<any>({
      action: SubjectAction.stay,
      orientation: Orientation.right,
      aiAction: {},
      ...props.state,
    });

    this._ai = new AI({ object: this, player: props.player });
  }

  public get state() {
    return this._state;
  }

  public get ai() {
    return this._ai;
  }

  public getViewPolygon(playerFound: boolean): TPolygon {
    const polygon = this.getPolygon();
    const { orientation } = this.state.get();

    if (playerFound || this.damaged.active) {
      return {
        x: Draw.removePixels(polygon.x, this._viewPadding.x),
        y: polygon.y,
        width: Draw.addPixels(polygon.width, this._viewPadding.x * 2),
        height: polygon.height,
      };
    }

    switch (orientation) {
      case Orientation.left: {
        return {
          x: Draw.removePixels(polygon.x, this._viewPadding.x),
          y: polygon.y,
          width: Draw.addPixels(polygon.width, this._viewPadding.x),
          height: polygon.height,
        };
      }
      case Orientation.right: {
        return {
          x: polygon.x,
          y: polygon.y,
          width: Draw.addPixels(polygon.width, this._viewPadding.x),
          height: polygon.height,
        };
      }
    }
  }

  public effects(moving?: MovingGameObject) {
    const { action } = this.state.get();

    if (action === SubjectAction.die && action === SubjectAction.dead) {
      this.physic.stopX();
      return;
    }

    super.effects(moving);

    this.ai.findPlayer();
    this.ai.attack();
  }
}

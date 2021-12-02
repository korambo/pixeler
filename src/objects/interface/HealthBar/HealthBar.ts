import { Interface, InterfaceProps } from '@objects/base/Interface';
import { drawHealthBar } from '@objects/interface/HealthBar/draw';

export interface HealthBarProps extends InterfaceProps {
  max: number;
  count: number;
}

export class HealthBar extends Interface {
  protected width = 14;
  protected height = 1;

  private _count: number;
  private _max: number;

  public constructor(props: HealthBarProps) {
    super(props);

    this._count = props.count;
    this._max = props.max;
  }

  public get max() {
    return this._max;
  }

  public set max(maxCount) {
    this._max = maxCount;
  }

  public get count() {
    return this._count;
  }

  public set count(count) {
    this._count = count;
  }

  // eslint-disable-next-line class-methods-use-this
  public init() {}

  public draw = () => {
    const drawParams = {
      coordinates: this.getCoordinates(),
      sizes: this.getSizes(),
      flip: null,
    };

    drawHealthBar(drawParams, {
      max: this._max,
      count: this._count,
    });
  };
}

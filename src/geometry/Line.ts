import { Canvas, CanvasProps } from '@core/Canvas';
import { Angle } from '@geometry/types';
import { Options } from '@core/Options';

export interface LineProps extends CanvasProps {
  angle?: Angle;
  size: number;
  color?: string;
  canFlip?: boolean;
  weight?: number;
}

export class Line extends Canvas {
  protected width = null;
  protected height = null;

  protected color: string = 'darkgrey';

  private readonly weight: number;
  private readonly angle: Angle;
  private readonly size: number;

  public readonly canFlip: boolean;

  public constructor(props: LineProps) {
    super(props);

    const { cellSize } = Options.getCanvasOptions();

    this.setCoordinates({
      x: props.x,
      y: props.y,
    });

    this.angle = props.angle || Angle.deg0;
    this.size = props.size * cellSize;
    this.weight = props.weight || 1;

    if (typeof props.canFlip !== 'undefined') this.canFlip = props.canFlip;
    if (props.color) this.color = props.color;
  }

  private drawVertical = () => {
    const { ctx, cellSize } = Options.getCanvasOptions();
    const coordinates = this.getCoordinates();

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.rect(coordinates.x, coordinates.y, cellSize * this.weight, this.size);
    ctx.fill();
  };

  private drawHorizontal = () => {
    const { ctx, cellSize } = Options.getCanvasOptions();
    const coordinates = this.getCoordinates();

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.rect(coordinates.x, coordinates.y, this.size, cellSize * this.weight);
    ctx.fill();
  };

  private drawIncline = (incline: Angle.deg45 | Angle.deg135) => {
    const { ctx, cellSize } = Options.getCanvasOptions();
    const coordinates = this.getCoordinates();

    const dotsCount = this.size / cellSize;

    for (let i = 0; i < dotsCount; i++) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.rect(
        coordinates.x + cellSize * i,
        incline === Angle.deg45 ? coordinates.y - i * cellSize : coordinates.y + i * cellSize,
        cellSize * this.weight,
        cellSize,
      );
      ctx.fill();
    }
  };

  // eslint-disable-next-line class-methods-use-this
  public init() {}

  public draw() {
    switch (this.angle) {
      case Angle.deg0: {
        this.drawHorizontal();
        break;
      }
      case Angle.deg90: {
        this.drawVertical();
        break;
      }
      case Angle.deg45:
      case Angle.deg135: {
        this.drawIncline(this.angle);
      }
    }
  }
}

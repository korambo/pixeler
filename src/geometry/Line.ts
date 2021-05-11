import { LINE_WIDTH } from '@core/constants';
import { Canvas, CanvasProps } from '@core/Canvas';
import { Angle } from '@geometry/types';

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

  constructor(props: LineProps) {
    super(props);

    this.setCoordinates({
      x: props.x,
      y: props.y,
    });

    this.angle = props.angle || Angle.deg0;
    this.size = props.size * LINE_WIDTH;
    this.weight = props.weight || 1;

    if (typeof props.canFlip !== 'undefined') this.canFlip = props.canFlip;
    if (props.color) this.color = props.color;
  }

  public drawVertical = () => {
    const { ctx } = this.getCanvasOptions();
    const coordinates = this.getCoordinates();

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.rect(coordinates.x, coordinates.y, LINE_WIDTH * this.weight, this.size);
    ctx.fill();
  }

  public drawHorizontal = () => {
    const { ctx } = this.getCanvasOptions();
    const coordinates = this.getCoordinates();

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.rect(coordinates.x, coordinates.y, this.size, LINE_WIDTH * this.weight);
    ctx.fill();
  }

  public drawIncline = (incline: Angle.deg45 | Angle.deg135) => {
    const { ctx } = this.getCanvasOptions();
    const coordinates = this.getCoordinates();

    const dotsCount = this.size / LINE_WIDTH;

    for (let i = 0; i < dotsCount; i++) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.rect(
        coordinates.x + LINE_WIDTH * i,
        incline === Angle.deg45 ? coordinates.y - i * LINE_WIDTH : coordinates.y + i * LINE_WIDTH,
        LINE_WIDTH * this.weight,
        LINE_WIDTH
      );
      ctx.fill();
    }
  }

  public draw() {
    switch (this.angle) {
      case Angle.deg0: {
        this.drawHorizontal();
        break
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

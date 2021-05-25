import { Figure } from '@geometry/base/Figure';
import { TPolygon } from '@core/types';
import { Options } from '@core/Options';

export interface PolygonProps {
  dots: TPolygon;
}

// FOR DEBUG
export class Polygon extends Figure {
  private readonly dots: TPolygon;

  public constructor(props: PolygonProps) {
    super({
      ...props, x: null, y: null, width: null, height: null,
    });

    this.dots = props.dots;
  }

  public draw() {
    const { ctx, cellSize } = Options.getCanvasOptions();

    const lineWidth = cellSize / 2;

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.setLineDash([lineWidth, lineWidth]);

    ctx.beginPath();

    ctx.moveTo(this.dots[0][0], this.dots[0][1]);
    ctx.lineTo(this.dots[1][0], this.dots[1][1]);
    ctx.lineTo(this.dots[2][0], this.dots[2][1]);
    ctx.lineTo(this.dots[3][0], this.dots[3][1]);
    ctx.lineTo(this.dots[0][0], this.dots[0][1]);

    ctx.stroke();
    ctx.setLineDash([]);
  }
}

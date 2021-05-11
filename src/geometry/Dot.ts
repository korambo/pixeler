import { Figure } from '@geometry/base/Figure';
import { Draw } from '@core/Draw';
import { CanvasProps } from '@core/Canvas';

export interface DotProps extends CanvasProps {
  canFlip?: boolean;
  color?: string;
}

export class Dot extends Figure {
  constructor(props: DotProps) {
    super({
      ...props,
      width: Draw.getPixels(1),
      height: Draw.getPixels(1),
    });
  }

  public draw() {
    const { ctx } = this.getCanvasOptions();
    const sizes = this.getSizes();
    const coordinates = this.getCoordinates();

    ctx.fillStyle = this.color;

    ctx.beginPath();

    ctx.rect(coordinates.x, coordinates.y, sizes.width, sizes.height);

    ctx.fill();
  }
}

import { Figure } from '@geometry/base/Figure';
import { Draw } from '@core/Draw';
import { CanvasProps } from '@core/Canvas';
import { Options } from '@core/Options';

export interface DotProps extends CanvasProps {
  canFlip?: boolean;
  color?: string;
}

export class Dot extends Figure {
  public constructor(props: DotProps) {
    super({
      ...props,
      width: Draw.getPixels(1),
      height: Draw.getPixels(1),
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public init() {}

  public draw() {
    const { ctx } = Options.getCanvasOptions();
    const sizes = this.getSizes();
    const coordinates = this.getCoordinates();

    ctx.fillStyle = this.color;

    ctx.beginPath();

    ctx.rect(coordinates.x, coordinates.y, sizes.width, sizes.height);

    ctx.fill();
  }
}

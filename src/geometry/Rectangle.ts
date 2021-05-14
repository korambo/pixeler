import { Figure, FigureProps } from '@geometry/base/Figure';
import { Options } from '@core/Options';

export interface RectangleProps extends FigureProps {}

export class Rectangle extends Figure {
  private drawFilled = () => {
    const { ctx } = Options.getCanvasOptions();
    const sizes = this.getSizes();
    const coordinates = this.getCoordinates();

    ctx.fillStyle = this.color;

    ctx.beginPath();

    ctx.rect(coordinates.x, coordinates.y, sizes.width, sizes.height);

    ctx.fill();
  };

  private drawStroke = () => {
    const { ctx, cellSize } = Options.getCanvasOptions();
    const sizes = this.getSizes();
    const coordinates = this.getCoordinates();

    const lineWidth = cellSize / 2;

    ctx.strokeStyle = this.color;
    ctx.lineWidth = cellSize;

    ctx.beginPath();

    ctx.moveTo(coordinates.x + lineWidth, coordinates.y + lineWidth);
    ctx.lineTo(coordinates.x + sizes.width - lineWidth, coordinates.y + lineWidth);
    ctx.lineTo(coordinates.x + sizes.width - lineWidth, coordinates.y - lineWidth + sizes.height);
    ctx.lineTo(coordinates.x + lineWidth, coordinates.y - lineWidth + sizes.height);
    ctx.lineTo(coordinates.x + lineWidth, coordinates.y);

    ctx.stroke();
  };

  public draw() {
    const { ctx } = Options.getCanvasOptions();

    if (this.dashed) ctx.setLineDash(this.dashed);
    this.filled ? this.drawFilled() : this.drawStroke();
    if (this.dashed) ctx.setLineDash([]);
  }
}

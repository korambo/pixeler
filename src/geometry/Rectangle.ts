import { LINE_WIDTH } from '@core/constants';
import { Figure, FigureProps } from '@geometry/base/Figure';

export interface RectangleProps extends FigureProps {}

export class Rectangle extends Figure {
  private drawFilled = () => {
    const { ctx } = this.getCanvasOptions();
    const sizes = this.getSizes();
    const coordinates = this.getCoordinates();

    ctx.fillStyle = this.color;

    ctx.beginPath();

    ctx.rect(coordinates.x, coordinates.y, sizes.width, sizes.height);

    ctx.fill();
  }

  private drawStroke = () => {
    const { ctx } = this.getCanvasOptions();
    const sizes = this.getSizes();
    const coordinates = this.getCoordinates();

    const lineWidth = LINE_WIDTH / 2;

    ctx.strokeStyle = this.color;
    ctx.lineWidth = LINE_WIDTH;

    ctx.beginPath();

    ctx.moveTo(coordinates.x + lineWidth, coordinates.y + lineWidth);
    ctx.lineTo(coordinates.x + sizes.width - lineWidth, coordinates.y + lineWidth);
    ctx.lineTo(coordinates.x + sizes.width - lineWidth, coordinates.y - lineWidth + sizes.height);
    ctx.lineTo(coordinates.x + lineWidth, coordinates.y - lineWidth + sizes.height);
    ctx.lineTo(coordinates.x + lineWidth, coordinates.y);

    ctx.stroke()
  }

  public draw() {
    this.filled ? this.drawFilled() : this.drawStroke();
  }
}
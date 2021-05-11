import { LINE_WIDTH } from '@core/constants';
import { TCoordinates, TSizes } from '@core/types';
import { Canvas, CanvasProps } from '@core/Canvas';

export interface LineProps extends CanvasProps {
  dots: TCoordinates[];
  color?: string;
}

export class Line extends Canvas {
  width = null;
  height = null;

  dots: TCoordinates[];

  protected color: string = 'darkgrey';

  constructor(props: LineProps) {
    super(props);

    this.dots = props.dots;

    if (props.color) this.color = props.color;
  }

  public getDots = () => {
    return this.dots;
  }

  public setDots = (dots: TCoordinates[]) => {
    this.dots = dots;
  }

  public draw() {
    const { ctx } = this.getCanvasOptions();
    const sizes = this.getSizes();

    ctx.strokeStyle = this.color;

    ctx.beginPath();

    // ctx.moveTo(coordinates.x + lineWidth, coordinates.y + lineWidth);
    // ctx.lineTo(coordinates.x + sizes.width - lineWidth, coordinates.y + lineWidth);
    // ctx.lineTo(coordinates.x + sizes.width - lineWidth, coordinates.y - lineWidth + sizes.height);
    // ctx.lineTo(coordinates.x + lineWidth, coordinates.y - lineWidth + sizes.height);
    // ctx.lineTo(coordinates.x + lineWidth, coordinates.y);


    this.dots.forEach((coordinates, index) => {

      if (index === 0) {
        ctx.moveTo(coordinates.x, coordinates.y - LINE_WIDTH / 2);
      } else {
        ctx.lineTo(coordinates.x, coordinates.y - LINE_WIDTH / 2);
      }
    });

    ctx.stroke()
  }
}
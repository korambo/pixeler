import { Canvas, CanvasProps } from '@core/Canvas';
import { TSizes } from '@core/types';

export interface FigureProps extends TSizes, CanvasProps {
  filled?: boolean;
  canFlip?: boolean;
  color?: string;
  dashed?: [number, number];
}

export abstract class Figure extends Canvas {
  protected width = null;
  protected height = null;

  public canFlip: boolean;

  protected filled: boolean = false;
  protected dashed: [number, number];

  protected color: string = 'darkgrey';

  constructor(props: FigureProps) {
    super(props);

    this.setSizes({
      width: props.width,
      height: props.height,
    });

    this.setCoordinates({
      x: props.x,
      y: props.y,
    });

    this.canFlip = typeof props.canFlip === 'boolean' ? props.canFlip : true;

    if (props.color) this.color = props.color;
    if (typeof props.filled !== 'undefined') this.filled = props.filled;
    if (typeof props.dashed !== 'undefined') this.dashed = props.dashed;
  }
}

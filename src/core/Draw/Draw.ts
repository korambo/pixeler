import { Figure } from '@geometry/base/Figure';
import { Flip, TCoordinates, TSizes } from '@core/types';
import { Canvas } from '@core/Canvas';
import { LINE_WIDTH } from '@core/constants';
import { Game } from '@core/Game';

type DrawElement = Figure;

export interface DrawParams {
  sizes: TSizes;
  coordinates: TCoordinates;
  flip?: Flip;
}

interface DrawProps extends TSizes, TCoordinates {
  flip?: Flip;
  elements: DrawElement[];
}

export class Draw extends Canvas {
  width: null;
  height: null;

  private readonly flip: Flip;

  private elements: DrawElement[];

  constructor(props: DrawProps) {
    super(props);

    if (typeof props.flip !== 'undefined') this.flip = props.flip;
    this.elements = props.elements;

    this.setSizes({
      width: props.width,
      height: props.height,
    });

    this.setCoordinates({
      x: props.x,
      y: props.y,
    });
  }

  static addPixels = (num: number, count: number) => {
    return num + LINE_WIDTH * count;
  }

  static removePixels = (num: number, count: number) => {
    return num - LINE_WIDTH * count;
  }

  static getPixels = (count: number) => {
    return LINE_WIDTH * count;
  }

  public draw = () => {
    const canvasCoordinates = this.getCoordinates();
    const canvasSizes = this.getSizes();

    this.elements.forEach((item, index) => {
      if (this.flip && item.canFlip) {
        const coordinates = item.getCoordinates();
        const sizes = item.getSizes();

        if (item instanceof Figure) {
          if (this.flip === Flip.x) {
            const end = canvasCoordinates.x + canvasSizes.width;
            const padding = (coordinates.x - canvasCoordinates.x);

            item.setCoordinates({
              x: end - sizes.width - padding,
            })
          }
        }
      }

      item.draw();
    });
  }
}
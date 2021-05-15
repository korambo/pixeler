import { Figure } from '@geometry/base/Figure';
import { Flip, TCoordinates, TSizes } from '@core/types';
import { Canvas } from '@core/Canvas';
import { Line } from '@geometry/Line';
import { Options } from '@core/Options';

type DrawElement = Figure | Line;

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
    const { cellSize } = Options.getCanvasOptions();

    return parseInt(`${num + cellSize * count}`, 10);
  };

  static removePixels = (num: number, count: number) => {
    const { cellSize } = Options.getCanvasOptions();

    return parseInt(`${num - cellSize * count}`, 10);
  };

  static getPixels = (count: number) => {
    const { cellSize } = Options.getCanvasOptions();

    return parseInt(`${cellSize * count}`, 10);
  };

  static drawImage = (img: HTMLImageElement, coordinates: TCoordinates, size: TSizes) => {
    const { ctx, cellSize } = Options.getCanvasOptions();

    ctx.drawImage(img, coordinates.x, coordinates.y, size.width * cellSize, size.height * cellSize);
  };

  public draw = () => {
    const canvasCoordinates = this.getCoordinates();
    const canvasSizes = this.getSizes();

    this.elements.forEach((item) => {
      if (this.flip && item.canFlip) {
        const coordinates = item.getCoordinates();
        const sizes = item.getSizes();

        if (item instanceof Figure) {
          if (this.flip === Flip.x) {
            const end = canvasCoordinates.x + canvasSizes.width;
            const padding = (coordinates.x - canvasCoordinates.x);

            item.setCoordinates({
              x: end - sizes.width - padding,
            });
          }
        }
      }

      item.draw();
    });
  };
}

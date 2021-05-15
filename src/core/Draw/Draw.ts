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

    return num + cellSize * count;
  };

  static removePixels = (num: number, count: number) => {
    const { cellSize } = Options.getCanvasOptions();

    return num - cellSize * count;
  };

  static getPixels = (count: number) => {
    const { cellSize } = Options.getCanvasOptions();

    return cellSize * count;
  };

  static resizeImage = (base64Image: string): Promise<CanvasImageSource> => new Promise((resolve) => {
    const { cellSize } = Options.getCanvasOptions();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = base64Image;

    img.onload = () => {
      const width = Math.sqrt(img.width ** 2 / cellSize);
      const height = Math.sqrt(img.height ** 2 / cellSize);

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0);

      resolve(canvas);
    };
  });

  static drawImage = (base64Image: string, coordinates: TCoordinates) => {
    const { ctx } = Options.getCanvasOptions();

    Draw.resizeImage(base64Image).then((resizedImg) => {
      ctx.drawImage(resizedImg, coordinates.x, coordinates.y);
    });
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

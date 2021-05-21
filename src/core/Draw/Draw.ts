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

  /**
   * Create new canvas element with 2d context
   *
   * @param width
   * @param height
   */
  static createCanvas = ({ width, height }: TSizes) => {
    const canvas = document.createElement('canvas');

    canvas.width = width;
    canvas.height = height;

    return {
      canvas,
      ctx: canvas.getContext('2d'),
    };
  };

  /**
   * Add pixels count relative cellSize
   *
   * @param num
   * @param count
   */
  static addPixels = (num: number, count: number) => {
    const { cellSize } = Options.getCanvasOptions();

    return parseInt(`${num + cellSize * count}`, 10);
  };

  /**
   * Remove pixels count relative cellSize
   *
   * @param num
   * @param count
   */
  static removePixels = (num: number, count: number) => {
    const { cellSize } = Options.getCanvasOptions();

    return parseInt(`${num - cellSize * count}`, 10);
  };

  /**
   * Returns pixels count relative cellSize
   *
   * @param count
   */
  static getPixels = (count: number) => {
    const { cellSize } = Options.getCanvasOptions();

    return parseInt(`${cellSize * count}`, 10);
  };

  /**
   * Flip image horizontal
   *
   * @param image
   * @param sizes
   */
  static flipImage = (image: HTMLImageElement, sizes: TSizes) => {
    const width = Draw.getPixels(sizes.width);
    const height = Draw.getPixels(sizes.height);

    const { canvas: imageCanvas, ctx: imageCtx } = Draw.createCanvas({ width, height });

    imageCtx.scale(-1, 1);
    imageCtx.drawImage(image, 0, 0, width * -1, height);

    return imageCanvas;
  };

  /**
   * Simple drawing image to canvas
   *
   * @param image
   * @param coordinates
   * @param sizes
   * @param flip
   */
  static drawImage = (image: HTMLImageElement, coordinates: TCoordinates, sizes: TSizes, flip?: boolean) => {
    const { ctx } = Options.getCanvasOptions();
    const imageForDraw = flip ? Draw.flipImage(image, sizes) : image;

    ctx.drawImage(imageForDraw, coordinates.x, coordinates.y, sizes.width, sizes.height);
  };

  /**
   * Create pattern from image
   *
   * @param image
   * @param size
   */
  static getPattern = (image: HTMLImageElement, size: TSizes): CanvasPattern => {
    const { ctx, cellSize } = Options.getCanvasOptions();

    const width = size.width * cellSize;
    const height = size.height * cellSize;

    const { canvas: patternCanvas, ctx: patternCtx } = Draw.createCanvas({ width, height });

    patternCtx.drawImage(image, 0, 0, width, height);

    return ctx.createPattern(patternCanvas, 'repeat');
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

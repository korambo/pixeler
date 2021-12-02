import { Canvas } from '@core/Canvas';
import { TCoordinates } from '@core/types';
import { Draw } from '@core/Draw';
import { Options } from '@core/Options';
import { createId } from '../../../tools/other';

export interface ImageProps {
  image: HTMLImageElement | HTMLCanvasElement;
  customCtx?: CanvasRenderingContext2D;
  canFlip?: boolean;
}

export class Image extends Canvas {
  protected width = null;
  protected height = null;

  protected canFlip: boolean;
  protected customCtx: CanvasRenderingContext2D;

  protected image: HTMLImageElement | HTMLCanvasElement;
  private flipped: HTMLCanvasElement;
  private readonly id: string;

  public constructor(props: ImageProps) {
    super(props);

    this.setSizes({
      width: props.image.width,
      height: props.image.height,
    });

    this.canFlip = props.canFlip;

    this.image = props.image;

    this.customCtx = props.customCtx;

    this.id = createId();

    if (this.canFlip) {
      this.setFlippedImage();
    }
  }

  public getId = () => this.id;

  /**
   * Flip image horizontal
   */
  private setFlippedImage = () => {
    const { width, height } = this.getSizes();
    const { canvas: imageCanvas, ctx: imageCtx } = Draw.createCanvas({ width, height });

    imageCtx.scale(-1, 1);
    imageCtx.drawImage(this.image, 0, 0, width * -1, height);

    this.flipped = imageCanvas;
  };

  public getImage = () => this.image;

  public drawImage = ({ x, y }: TCoordinates, flip?: boolean) => {
    const { ctx } = Options.getCanvasOptions();
    const { width, height } = this.getSizes();

    (this.customCtx || ctx).drawImage(flip && this.canFlip ? this.flipped : this.image, x, y, width, height);
  };

  // eslint-disable-next-line class-methods-use-this
  public init() {}

  public draw = () => {
    throw new Error(`Method draw is not available for class ${this.constructor.name}!`);
  };
}

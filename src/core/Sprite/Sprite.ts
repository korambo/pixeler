import { Options } from '@core/Options';
import { TCoordinates, TSizes } from '@core/types';
import { Image, ImageProps } from '@core/Image';
import { Draw } from '@core/Draw';

interface SpriteProps extends ImageProps {
  frameSize: TSizes;
}

export class Sprite extends Image {
  private readonly frameSize: TSizes;
  private frames: Array<Image[]>;
  private framesCount: TCoordinates;

  constructor(props: SpriteProps) {
    super(props);

    this.frameSize = props.frameSize;
    this.framesCount = {
      x: this.width / this.frameSize.width,
      y: this.height / this.frameSize.height,
    };

    this.setFrames();
  }

  private createFrame = ({ x, y }: TCoordinates) => {
    const { cellSize } = Options.getCanvasOptions();

    const width = this.frameSize.width * cellSize;
    const height = this.frameSize.height * cellSize;

    const { canvas: frameCanvas, ctx: frameCtx } = Draw.createCanvas({ width, height });

    frameCtx.drawImage(
      this.image,
      x * cellSize,
      y * cellSize,
      width,
      height,
      0, 0,
      width,
      height,
    );

    return new Image({ image: frameCanvas, canFlip: this.canFlip });
  };

  private setFrames = () => {
    const frames = [];

    for (let x = 0; x < this.framesCount.x; x++) {
      frames.push([]);
      for (let y = 0; y < this.framesCount.y; y++) {
        frames[x].push(this.createFrame({
          x: this.frameSize.width * x,
          y: this.frameSize.height * y,
        }));
      }
    }

    this.frames = frames;
  };

  public getFramesCount = () => this.framesCount;

  public getFrame = ([x, y]: [number, number]) => this.frames[x][y];

  public drawFrame = ([x, y]: [number, number], coordinates: TCoordinates, flip?: boolean) => {
    const frameImage = this.frames[x][y];

    frameImage.drawImage(coordinates, flip);
  };

  public drawImage = () => {
    throw new Error(`Method drawImage is not available for class ${this.constructor.name}!`);
  };
}

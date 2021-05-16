import { Canvas, CanvasProps } from '@core/Canvas';
import { ImageLoader } from '@core/ImageLoader';
import { TSizes } from '@core/types';
import { Options } from '@core/Options';

export enum TileType {
  outer = 'outer',
  inner = 'inner',
}

export interface TileProps extends CanvasProps, TSizes {
  type: TileType;
  imageLoader: ImageLoader;
}

export abstract class Tile extends Canvas {
  protected width = null;
  protected height = null;

  protected imageLoader: ImageLoader;

  protected readonly type: TileType;
  private pattern: CanvasPattern;
  private inited = false;

  constructor(props: TileProps) {
    super(props);

    this.setSizes({
      width: props.width,
      height: props.height,
    });

    this.type = props.type;
    this.imageLoader = props.imageLoader;
  }

  protected abstract init(): void;

  protected setPattern = (pattern: CanvasPattern) => {
    this.pattern = pattern;
  };

  public draw = () => {
    const { ctx } = Options.getCanvasOptions();
    const coordinates = this.getCoordinates();
    const sizes = this.getSizes();

    if (!this.inited) {
      this.init();
      this.inited = true;
    }

    ctx.beginPath();
    ctx.fillStyle = this.pattern;
    ctx.rect(coordinates.x, coordinates.y, sizes.width, sizes.height);
    ctx.fill();
  };
}

export type TileInstance = { new(props: TileProps): Tile };

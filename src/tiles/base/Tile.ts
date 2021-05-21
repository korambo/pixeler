import { Canvas, CanvasProps } from '@core/Canvas';
import { ImageLoader } from '@core/ImageLoader';
import { TSizes } from '@core/types';
import { Options } from '@core/Options';
import { TileType } from '@tiles/types';
import { Draw } from '@core/Draw';
import { TILE_SIZE } from '@core/constants';

export interface TileProps extends CanvasProps, TSizes {
  type: TileType;
  imageLoader: ImageLoader;
}

export abstract class Tile extends Canvas {
  protected width = null;
  protected height = null;

  protected imageLoader: ImageLoader;

  protected abstract sprite: Record<TileType, string>;
  protected readonly type: TileType;
  private pattern: CanvasPattern;

  constructor(props: TileProps) {
    super(props);

    this.setSizes({
      width: props.width,
      height: props.height,
    });

    this.type = props.type;
    this.imageLoader = props.imageLoader;
  }

  private initPattern = () => {
    const img = this.imageLoader.getImage(this.sprite[this.type]);
    this.pattern = Draw.getPattern(img, { width: TILE_SIZE, height: TILE_SIZE });
  };

  public draw = () => {
    const { ctx } = Options.getCanvasOptions();
    const coordinates = this.getCoordinates();
    const sizes = this.getSizes();

    if (!this.pattern) {
      this.initPattern();
    }

    ctx.beginPath();
    ctx.fillStyle = this.pattern;
    ctx.rect(coordinates.x, coordinates.y, sizes.width, sizes.height);
    ctx.fill();
  };
}

export type TileInstance = { new(props: TileProps): Tile };

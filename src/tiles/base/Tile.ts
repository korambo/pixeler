import { Canvas, CanvasProps } from '@core/Canvas';
import { ImageLoader } from '@core/ImageLoader';
import { TSizes } from '@core/types';
import { Options } from '@core/Options';
import { TileType } from '@tiles/types';
import { Draw } from '@core/Draw';
import { TILE_SIZE } from '@core/constants';
import { Sprite } from '@core/Sprite';

export interface TileProps extends CanvasProps, TSizes {
  type: TileType;
  imageLoader: ImageLoader;
}

export abstract class Tile extends Canvas {
  protected width = null;
  protected height = null;

  protected imageLoader: ImageLoader;

  protected abstract spriteImage: string;
  protected sprite: Sprite;
  protected readonly type: TileType;
  private pattern: CanvasPattern;

  public constructor(props: TileProps) {
    super(props);

    this.setSizes({
      width: props.width,
      height: props.height,
    });

    this.type = props.type;
    this.imageLoader = props.imageLoader;
  }

  private initPattern = () => {
    this.sprite = new Sprite({
      frameSize: { width: TILE_SIZE, height: TILE_SIZE },
      image: this.imageLoader.getImage(this.spriteImage),
    });
    const img = this.getSpriteTile(this.type);
    this.pattern = Draw.getPattern(img.getImage(), { width: TILE_SIZE, height: TILE_SIZE });
  };

  public getSpriteTile = (type: TileType) => {
    switch (type) {
      case TileType.outerLeft: return this.sprite.getFrame([0, 0]);
      case TileType.outerTop: return this.sprite.getFrame([1, 0]);
      case TileType.outerRight: return this.sprite.getFrame([2, 0]);
      case TileType.innerLeft: return this.sprite.getFrame([0, 1]);
      case TileType.inner: return this.sprite.getFrame([1, 1]);
      case TileType.innerRight: return this.sprite.getFrame([2, 1]);
    }
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

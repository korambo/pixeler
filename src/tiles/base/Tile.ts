import { Canvas, CanvasProps } from '@core/Canvas';
import { AssetsLoader } from '@core/Assets/AssetsLoader';
import { TSizes } from '@core/types';
import { TileType } from '@tiles/types';
import { Draw } from '@core/Draw';
import { TILE_SIZE } from '@core/constants';
import { Sprite } from '@core/Assets/Sprite';

export interface TileProps extends CanvasProps, TSizes {
  type: TileType;
  assetsLoader: AssetsLoader;
  ctx: CanvasRenderingContext2D;
}

export abstract class Tile extends Canvas {
  protected width = null;
  protected height = null;

  protected assetsLoader: AssetsLoader;

  protected abstract spriteImage: string;
  protected sprite: Sprite;
  protected readonly type: TileType;
  private pattern: CanvasPattern;
  private ctx: CanvasRenderingContext2D;

  public constructor(props: TileProps) {
    super(props);

    this.setSizes({
      width: props.width,
      height: props.height,
    });

    this.type = props.type;
    this.assetsLoader = props.assetsLoader;
    this.ctx = props.ctx;
  }

  private initPattern = () => {
    this.sprite = new Sprite({
      frameSize: { width: TILE_SIZE, height: TILE_SIZE },
      image: this.assetsLoader.getImage(this.spriteImage),
    });
    const img = this.getSpriteTile(this.type);
    this.pattern = Draw.getPattern(img.getImage(), { width: TILE_SIZE, height: TILE_SIZE });
  };

  public getSpriteTile = (type: TileType) => {
    switch (type) {
      case TileType.outerTopLeft: return this.sprite.getFrame([0, 0]);
      case TileType.outerTop: return this.sprite.getFrame([1, 0]);
      case TileType.outerTopRight: return this.sprite.getFrame([2, 0]);

      case TileType.innerTopLeft: return this.sprite.getFrame([0, 1]);
      case TileType.innerTop: return this.sprite.getFrame([1, 1]);
      case TileType.innerTopRight: return this.sprite.getFrame([2, 1]);

      case TileType.left: return this.sprite.getFrame([0, 2]);
      case TileType.inner: return this.sprite.getFrame([1, 2]);
      case TileType.right: return this.sprite.getFrame([2, 2]);

      case TileType.bottomLeft: return this.sprite.getFrame([0, 3]);
      case TileType.bottom: return this.sprite.getFrame([1, 3]);
      case TileType.bottomRight: return this.sprite.getFrame([2, 3]);

      case TileType.horizontalOuterLeft: return this.sprite.getFrame([0, 4]);
      case TileType.horizontalOuter: return this.sprite.getFrame([1, 4]);
      case TileType.horizontalOuterRight: return this.sprite.getFrame([2, 4]);

      case TileType.horizontalInnerLeft: return this.sprite.getFrame([0, 5]);
      case TileType.horizontalInner: return this.sprite.getFrame([1, 5]);
      case TileType.horizontalInnerRight: return this.sprite.getFrame([2, 5]);

      case TileType.verticalOuterTop: return this.sprite.getFrame([0, 6]);
      case TileType.verticalInnerTop: return this.sprite.getFrame([1, 6]);
      case TileType.verticalInner: return this.sprite.getFrame([2, 6]);
      case TileType.verticalBottom: return this.sprite.getFrame([0, 7]);

      case TileType.fullInner: return this.sprite.getFrame([1, 7]);
      case TileType.fullOuter: return this.sprite.getFrame([2, 7]);
    }
  };

  public draw = () => {
    const coordinates = this.getCoordinates();
    const sizes = this.getSizes();

    if (!this.pattern) {
      this.initPattern();
    }

    this.ctx.beginPath();
    this.ctx.fillStyle = this.pattern;
    this.ctx.rect(coordinates.x, coordinates.y, sizes.width, sizes.height);
    this.ctx.fill();
  };
}

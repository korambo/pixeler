import { Tile } from '@tiles/base/Tile';
import { ImageLoader } from '@core/ImageLoader';
import { Draw } from '@core/Draw';
import { TILE_SIZE } from '@core/constants';
import { TileInstance, TileType } from '@tiles/types';
import { Terrain, TerrainProps } from '@objects/base/Terrain';

type TilesCount = [xCount: number, yCount: number];

interface OuterBorder {
  left: boolean;
  right: boolean;
}

interface InnerBorder {
  left: boolean;
  right: boolean;
}

interface PlatformProps extends TerrainProps {
  tile: TileInstance;
  imageLoader: ImageLoader;
  tilesCount: TilesCount;
  outerBorder?: OuterBorder;
  innerBorder?: InnerBorder;
  onlyInner?: boolean;
}

export class Platform extends Terrain {
  protected width = null;
  protected height = null;

  protected imageLoader: ImageLoader;

  private readonly Tile: TileInstance;
  private readonly tilesCount: TilesCount;
  private tiles: Tile[] = [];

  protected onlyInner: boolean;

  private outerBorder: OuterBorder;
  private innerBorder: InnerBorder;

  public constructor(props: PlatformProps) {
    super(props);

    this.Tile = props.tile;
    this.imageLoader = props.imageLoader;
    this.tilesCount = props.tilesCount;
    this.outerBorder = props.outerBorder || { right: true, left: true };
    this.innerBorder = props.innerBorder || { right: true, left: true };

    this.onlyInner = props.onlyInner || false;

    const width = Draw.getPixels(TILE_SIZE * this.tilesCount[0]);
    const height = Draw.getPixels(TILE_SIZE * this.tilesCount[1]);

    this.setSizes({ width, height });

    this.init();
  }

  private init = () => {
    const [xCount, yCount] = this.tilesCount;
    const drawInner = yCount > 1 || this.onlyInner;

    if (!this.onlyInner) {
      if (this.outerBorder.left) {
        this.tiles.push(new this.Tile({
          width: Draw.getPixels(TILE_SIZE),
          height: Draw.getPixels(TILE_SIZE),
          x: this.x,
          y: this.y,
          imageLoader: this.imageLoader,
          type: TileType.outerLeft,
        }));
      }

      if (this.outerBorder.right) {
        this.tiles.push(new this.Tile({
          width: Draw.getPixels(TILE_SIZE),
          height: Draw.getPixels(TILE_SIZE),
          x: this.x + (xCount - 1) * TILE_SIZE,
          y: this.y,
          imageLoader: this.imageLoader,
          type: TileType.outerRight,
        }));
      }

      this.tiles.push(new this.Tile({
        width: Draw.getPixels((xCount - Object.values(this.outerBorder).filter(Boolean).length) * TILE_SIZE),
        height: Draw.getPixels(TILE_SIZE),
        x: this.x + (this.outerBorder.left ? TILE_SIZE : 0),
        y: this.y,
        imageLoader: this.imageLoader,
        type: TileType.outerTop,
      }));
    }

    if (drawInner) {
      const height = this.onlyInner ? yCount : yCount - 1;

      if (this.innerBorder.left) {
        this.tiles.push(new this.Tile({
          width: Draw.getPixels(TILE_SIZE),
          height: Draw.getPixels(TILE_SIZE * height),
          x: this.x,
          y: this.y + TILE_SIZE,
          imageLoader: this.imageLoader,
          type: TileType.innerLeft,
        }));
      }

      if (this.innerBorder.right) {
        this.tiles.push(new this.Tile({
          width: Draw.getPixels(TILE_SIZE),
          height: Draw.getPixels(TILE_SIZE * height),
          x: this.x + (xCount - 1) * TILE_SIZE,
          y: this.y + TILE_SIZE,
          imageLoader: this.imageLoader,
          type: TileType.innerRight,
        }));
      }

      this.tiles.push(new this.Tile({
        width: Draw.getPixels((xCount - Object.values(this.innerBorder).filter(Boolean).length) * TILE_SIZE),
        height: Draw.getPixels(TILE_SIZE * height),
        x: this.x + (this.innerBorder.left ? TILE_SIZE : 0),
        y: this.y + TILE_SIZE,
        imageLoader: this.imageLoader,
        type: TileType.inner,
      }));
    }
  };

  public draw() {
    this.tiles.forEach((item) => item.draw());
  }
}

import { Tile, TileInstance, TileType } from '@objects/base/Tile';
import { ImageLoader } from '@core/ImageLoader';
import { MovingGameObject } from '@objects/base/MovingGameObject';
import { GameObject, GameObjectProps } from '@objects/base/GameObject';
import { atRectangle } from '@objects/__presets/boundaryCheck';
import { Draw } from '@core/Draw';
import { TILE_SIZE } from '@core/constants';

type TilesCount = [xCount: number, yCount: number];

interface PlatformProps extends GameObjectProps {
  tile: TileInstance;
  imageLoader: ImageLoader;
  tilesCount: TilesCount;
}

export class Platform extends GameObject {
  width = null;
  height = null;

  protected imageLoader: ImageLoader;

  private readonly Tile: TileInstance;
  private readonly tilesCount: TilesCount;
  private tiles: Tile[] = [];

  constructor(props: PlatformProps) {
    super(props);

    this.Tile = props.tile;
    this.imageLoader = props.imageLoader;
    this.tilesCount = props.tilesCount;

    const width = Draw.getPixels(TILE_SIZE * this.tilesCount[0]);
    const height = Draw.getPixels(TILE_SIZE * this.tilesCount[1]);

    this.setSizes({ width, height });

    this.init();
  }

  private init = () => {
    const [xCount, yCount] = this.tilesCount;

    this.tiles.push((
      new this.Tile({
        width: Draw.getPixels(xCount * TILE_SIZE),
        height: Draw.getPixels(TILE_SIZE),
        x: this.x,
        y: this.y,
        imageLoader: this.imageLoader,
        type: TileType.outer,
      })
    ));

    if (yCount > 1) {
      this.tiles.push((
        new this.Tile({
          width: Draw.getPixels(xCount * TILE_SIZE),
          height: Draw.getPixels(TILE_SIZE * (yCount - 1)),
          x: this.x,
          y: this.y + TILE_SIZE,
          imageLoader: this.imageLoader,
          type: TileType.inner,
        })
      ));
    }
  };

  public boundaryCheck(movingObject: MovingGameObject) {
    atRectangle(this, movingObject);
  }

  public draw() {
    this.tiles.forEach((item) => item.draw());
  }
}

import { Tile } from '@tiles/base/Tile';
import { AssetsLoader } from '@core/Assets/AssetsLoader';
import { Draw } from '@core/Draw';
import { TILE_SIZE } from '@core/constants';
import { TileInstance, TileType } from '@tiles/types';
import { Terrain, TerrainProps } from '@objects/base/Terrain';
import { Physic } from '@physic/Physic';
import { Options } from '@core/Options';
import { objectOrBool } from '../../../tools/other';

type TilesCount = [xCount: number, yCount: number];

interface Border {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
}

interface PlatformProps extends TerrainProps {
  tile: TileInstance;
  assetsLoader: AssetsLoader;
  tilesCount: TilesCount;
  border?: Partial<Border> | boolean;
  onlyInner?: boolean;
  hasCollision?: boolean;
  isBackground?: boolean;
}

export class Platform extends Terrain {
  protected width = null;
  protected height = null;

  protected assetsLoader: AssetsLoader;

  private readonly Tile: TileInstance;
  private readonly tilesCount: TilesCount;
  private tiles: Tile[] = [];
  private customCanvas: { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D };

  private isBackground: boolean;

  protected onlyInner: boolean;

  private border: Border;

  public constructor(props: PlatformProps) {
    super(props);

    if (props.hasCollision === false) {
      this._physic = new Physic({
        gravity: this.gravity,
        object: this,
        canCollision: false,
        canInteraction: false,
      });
    }

    this.Tile = props.tile;
    this.assetsLoader = props.assetsLoader;
    this.tilesCount = props.tilesCount;
    this.border = objectOrBool(props.border, {
      top: true,
      right: true,
      bottom: true,
      left: true,
    });

    this.onlyInner = props.onlyInner || false;
    this.isBackground = props.isBackground || false;

    const width = Draw.getPixels(TILE_SIZE * this.tilesCount[0]);
    const height = Draw.getPixels(TILE_SIZE * this.tilesCount[1]);

    this.customCanvas = Draw.createCanvas({ width, height });

    this.setSizes({ width, height });
  }

  private inner() {
    const sizes = this.getSizes();

    this.tiles.push(
      new this.Tile({
        width: sizes.width,
        height: sizes.height,
        x: 0,
        y: 0,
        assetsLoader: this.assetsLoader,
        type: TileType.inner,
        ctx: this.customCanvas.ctx,
      }),
    );
  }

  private one() {
    this.tiles.push(new this.Tile({
      width: Draw.getPixels(TILE_SIZE),
      height: Draw.getPixels(TILE_SIZE),
      x: 0,
      y: 0,
      assetsLoader: this.assetsLoader,
      type: this.onlyInner ? TileType.fullInner : TileType.fullOuter,
      ctx: this.customCanvas.ctx,
    }));
  }

  private horizontal() {
    const [xCount] = this.tilesCount;

    this.tiles.push(
      new this.Tile({
        width: Draw.getPixels(TILE_SIZE),
        height: Draw.getPixels(TILE_SIZE),
        x: 0,
        y: 0,
        assetsLoader: this.assetsLoader,
        type: this.onlyInner ? TileType.horizontalInnerLeft : TileType.horizontalOuterLeft,
        ctx: this.customCanvas.ctx,
      }),
      new this.Tile({
        width: Draw.getPixels(TILE_SIZE * (xCount - 2)),
        height: Draw.getPixels(TILE_SIZE),
        x: TILE_SIZE,
        y: 0,
        assetsLoader: this.assetsLoader,
        type: this.onlyInner ? TileType.horizontalInner : TileType.horizontalOuter,
        ctx: this.customCanvas.ctx,
      }),
      new this.Tile({
        width: Draw.getPixels(TILE_SIZE),
        height: Draw.getPixels(TILE_SIZE),
        x: TILE_SIZE * (xCount - 1),
        y: 0,
        assetsLoader: this.assetsLoader,
        type: this.onlyInner ? TileType.horizontalInnerRight : TileType.horizontalOuterRight,
        ctx: this.customCanvas.ctx,
      }),
    );
  }

  private vertical() {
    const [, yCount] = this.tilesCount;

    this.tiles.push(
      new this.Tile({
        width: Draw.getPixels(TILE_SIZE),
        height: Draw.getPixels(TILE_SIZE),
        x: 0,
        y: 0,
        assetsLoader: this.assetsLoader,
        type: this.onlyInner ? TileType.verticalInnerTop : TileType.verticalOuterTop,
        ctx: this.customCanvas.ctx,
      }),
      new this.Tile({
        width: Draw.getPixels(TILE_SIZE),
        height: Draw.getPixels(TILE_SIZE * (yCount - 2)),
        x: 0,
        y: TILE_SIZE,
        assetsLoader: this.assetsLoader,
        type: TileType.verticalInner,
        ctx: this.customCanvas.ctx,
      }),
      new this.Tile({
        width: Draw.getPixels(TILE_SIZE),
        height: Draw.getPixels(TILE_SIZE),
        x: 0,
        y: TILE_SIZE * (yCount - 1),
        assetsLoader: this.assetsLoader,
        type: TileType.verticalBottom,
        ctx: this.customCanvas.ctx,
      }),
    );
  }

  private borders() {
    const [xCount, yCount] = this.tilesCount;

    if (xCount > 1) {
      if (this.border.top) {
        this.tiles.push(
          new this.Tile({
            width: Draw.getPixels(TILE_SIZE * xCount),
            height: Draw.getPixels(TILE_SIZE),
            x: 0,
            y: 0,
            assetsLoader: this.assetsLoader,
            type: this.onlyInner ? TileType.innerTop : TileType.outerTop,
            ctx: this.customCanvas.ctx,
          }),
        );
      }
      if (this.border.bottom) {
        this.tiles.push(
          new this.Tile({
            width: Draw.getPixels(TILE_SIZE * xCount),
            height: Draw.getPixels(TILE_SIZE),
            x: 0,
            y: TILE_SIZE * (yCount - 1),
            assetsLoader: this.assetsLoader,
            type: TileType.bottom,
            ctx: this.customCanvas.ctx,
          }),
        );
      }
    }

    if (yCount > 1) {
      if (this.border.left) {
        this.tiles.push(
          new this.Tile({
            width: Draw.getPixels(TILE_SIZE),
            height: Draw.getPixels(TILE_SIZE * yCount),
            x: 0,
            y: 0,
            assetsLoader: this.assetsLoader,
            type: TileType.left,
            ctx: this.customCanvas.ctx,
          }),
        );
      }
      if (this.border.right) {
        this.tiles.push(
          new this.Tile({
            width: Draw.getPixels(TILE_SIZE),
            height: Draw.getPixels(TILE_SIZE * yCount),
            x: TILE_SIZE * (xCount - 1),
            y: 0,
            assetsLoader: this.assetsLoader,
            type: TileType.right,
            ctx: this.customCanvas.ctx,
          }),
        );
      }
    }
  }

  private angels() {
    const [xCount, yCount] = this.tilesCount;

    const topRight = this.border.top && this.border.right;
    const topLeft = this.border.top && this.border.left;
    const bottomRight = this.border.bottom && this.border.right && yCount > 1;
    const bottomLeft = this.border.bottom && this.border.left && yCount > 1;

    if (topRight) {
      this.tiles.push(new this.Tile({
        width: Draw.getPixels(TILE_SIZE),
        height: Draw.getPixels(TILE_SIZE),
        x: (xCount - 1) * TILE_SIZE,
        y: 0,
        assetsLoader: this.assetsLoader,
        type: this.onlyInner ? TileType.innerTopRight : TileType.outerTopRight,
        ctx: this.customCanvas.ctx,
      }));
    }

    if (topLeft) {
      this.tiles.push(new this.Tile({
        width: Draw.getPixels(TILE_SIZE),
        height: Draw.getPixels(TILE_SIZE),
        x: 0,
        y: 0,
        assetsLoader: this.assetsLoader,
        type: this.onlyInner ? TileType.innerTopLeft : TileType.outerTopLeft,
        ctx: this.customCanvas.ctx,
      }));
    }

    if (bottomRight) {
      this.tiles.push(new this.Tile({
        width: Draw.getPixels(TILE_SIZE),
        height: Draw.getPixels(TILE_SIZE),
        x: (xCount - 1) * TILE_SIZE,
        y: TILE_SIZE * (yCount - 1),
        assetsLoader: this.assetsLoader,
        type: TileType.bottomRight,
        ctx: this.customCanvas.ctx,
      }));
    }

    if (bottomLeft) {
      this.tiles.push(new this.Tile({
        width: Draw.getPixels(TILE_SIZE),
        height: Draw.getPixels(TILE_SIZE),
        x: 0,
        y: TILE_SIZE * (yCount - 1),
        assetsLoader: this.assetsLoader,
        type: TileType.bottomLeft,
        ctx: this.customCanvas.ctx,
      }));
    }
  }

  private initTiles() {
    const [xCount, yCount] = this.tilesCount;

    this.inner();

    if (xCount === 1 && yCount === 1) {
      this.one();
      return;
    }

    if (yCount === 1) {
      this.horizontal();
      return;
    }

    if (xCount === 1) {
      this.vertical();
      return;
    }

    this.borders();
    this.angels();
  }

  public init() {
    this.initTiles();

    this.tiles.forEach((item) => item.draw());
  }

  public draw() {
    const { ctx } = Options.getCanvasOptions();
    const polygon = this.getPolygon();

    Draw.drawCanvas(this.customCanvas.canvas, this.getCoordinates(), this.getSizes());

    if (this.isBackground) {
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255,255,255,0.025)';
      // ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(polygon.x, polygon.y, polygon.width, polygon.height);
      ctx.fill();
    }
  }
}

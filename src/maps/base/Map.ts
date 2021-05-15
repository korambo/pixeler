import { TCoordinates } from '@core/types';
import { Tile } from '@objects/base/Tile';
import { Canvas, CanvasProps } from '@core/Canvas';
import { Inputs } from '@effects/Inputs';
import { Interaction } from '@objects/base/Interaction';
import { ImageLoader } from '@core/ImageLoader/ImageLoader';
import { Options } from '@core/Options';

export interface MapProps extends CanvasProps {
  inputs: Inputs;
  imageLoader: ImageLoader;
}

export abstract class Map extends Canvas {
  protected abstract start: TCoordinates;

  private tiles: Tile[];

  private interactions: Interaction[];

  protected imageLoader: ImageLoader;
  protected inputs: Inputs;

  protected background = 'lightblue';

  protected constructor(props: MapProps) {
    super(props);

    this.inputs = props.inputs;
  }

  public drawBackground = () => {
    const { ctx } = Options.getCanvasOptions();
    const sizes = this.getSizes();

    ctx.fillStyle = this.background;
    ctx.fillRect(0, 0, sizes.width, sizes.height);
  };

  public setTiles = (tiles: Tile[]) => {
    this.tiles = tiles;
  };

  public getTiles = () => this.tiles;

  public setInteractions = (interactions: Interaction[]) => {
    this.interactions = interactions;
  };

  public getInteractions = () => this.interactions;

  public getStart = (): TCoordinates => this.start;

  public draw() {
    this.tiles.forEach((tile) => tile.draw());
    this.interactions.forEach((interaction) => interaction.draw());
  }
}

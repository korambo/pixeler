import { TCoordinates } from '@core/types';
import { Canvas, CanvasProps } from '@core/Canvas';
import { Inputs } from '@effects/Inputs';
import { Interaction } from '@objects/base/Interaction';
import { ImageLoader } from '@core/ImageLoader/ImageLoader';
import { Options } from '@core/Options';
import { Terrain } from '@objects/tiles/Terrain';
import { Platform } from '@objects/Platform';
import { Decoration } from '@objects/base/Decoration';

export interface MapProps extends CanvasProps {
  inputs: Inputs;
  imageLoader: ImageLoader;
}

type Tiles = Platform | Terrain;

export abstract class Map extends Canvas {
  protected abstract start: TCoordinates;

  private tiles: Tiles[];
  private interactions: Interaction[];
  private decorations: Decoration[];

  protected imageLoader: ImageLoader;
  protected inputs: Inputs;

  protected background = 'lightblue';

  protected constructor(props: MapProps) {
    super(props);

    this.inputs = props.inputs;
    this.imageLoader = props.imageLoader;
  }

  public drawBackground = () => {
    const { ctx } = Options.getCanvasOptions();
    const sizes = this.getSizes();

    ctx.fillStyle = this.background;
    ctx.fillRect(0, 0, sizes.width, sizes.height);
  };

  public setTiles = (cb: (props: { imageLoader: ImageLoader }) => Tiles[]) => {
    this.tiles = cb({ imageLoader: this.imageLoader });
  };

  public setInteractions = (cb: (props: { imageLoader: ImageLoader, inputs: Inputs }) => Interaction[]) => {
    this.interactions = cb({ imageLoader: this.imageLoader, inputs: this.inputs });
  };

  public setDecoration = (cb: (props: { imageLoader: ImageLoader }) => Decoration[]) => {
    this.decorations = cb({ imageLoader: this.imageLoader });
  };

  public getTiles = () => this.tiles;

  public getInteractions = () => this.interactions;

  public getDecoration = () => this.decorations;

  public getStart = (): TCoordinates => this.start;

  public draw() {
    this.tiles.forEach((tile) => tile.draw());
    this.interactions.forEach((interaction) => interaction.draw());
    this.decorations.forEach((interaction) => interaction.draw());
  }
}

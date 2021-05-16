import { TCoordinates } from '@core/types';
import { Canvas, CanvasProps } from '@core/Canvas';
import { Inputs } from '@effects/Inputs';
import { Interaction } from '@objects/base/Interaction';
import { ImageLoader } from '@core/ImageLoader/ImageLoader';
import { Options } from '@core/Options';
import { Decoration } from '@objects/base/Decoration';
import { Terrain } from '@objects/base/Terrain';

export interface MapProps extends CanvasProps {
  inputs: Inputs;
  imageLoader: ImageLoader;
}

export abstract class Map extends Canvas {
  protected abstract start: TCoordinates;

  private terrain: Terrain[] = [];
  private interactions: Interaction[] = [];
  private decorations: Decoration[] = [];

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

  public setTerrain = (cb: (props: { imageLoader: ImageLoader }) => Terrain[]) => {
    this.terrain = cb({ imageLoader: this.imageLoader });
  };

  public setInteractions = (cb: (props: { imageLoader: ImageLoader, inputs: Inputs }) => Interaction[]) => {
    this.interactions = cb({ imageLoader: this.imageLoader, inputs: this.inputs });
  };

  public setDecoration = (cb: (props: { imageLoader: ImageLoader }) => Decoration[]) => {
    this.decorations = cb({ imageLoader: this.imageLoader });
  };

  public getTerrain = () => this.terrain;

  public getInteractions = () => this.interactions;

  public getDecoration = () => this.decorations;

  public getStart = (): TCoordinates => this.start;

  public draw() {
    this.terrain.forEach((tile) => tile.draw());
    this.interactions.forEach((interaction) => interaction.draw());
    this.decorations.forEach((interaction) => interaction.draw());
  }
}

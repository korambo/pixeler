import { TCoordinates } from '@core/types';
import { Canvas, CanvasProps } from '@core/Canvas';
import { Inputs } from '@effects/Inputs';
import { Interaction } from '@objects/base/Interaction';
import { ImageLoader } from '@core/ImageLoader/ImageLoader';
import { Options } from '@core/Options';
import { Decoration } from '@objects/base/Decoration';
import { Terrain } from '@objects/base/Terrain';
import { Gravity } from '@effects/Gravity';
import { Rectangle } from '@geometry/Rectangle';

interface TerrainParams {
  imageLoader: ImageLoader;
  gravity: Gravity;
}

interface InteractionParams {
  inputs: Inputs;
  imageLoader: ImageLoader;
  gravity: Gravity;
}

interface DecorationParams {
  imageLoader: ImageLoader;
}

export interface MapProps extends CanvasProps {
  inputs: Inputs;
  imageLoader: ImageLoader;
  gravity: Gravity;
}

export abstract class Map extends Canvas {
  protected abstract start: TCoordinates;

  private terrain: Terrain[] = [];
  private interactions: Interaction[] = [];
  private decorations: Decoration[] = [];

  protected imageLoader: ImageLoader;
  protected inputs: Inputs;
  protected gravity: Gravity;

  protected background = '#80b0bc';

  protected constructor(props: MapProps) {
    super(props);

    this.gravity = props.gravity;
    this.inputs = props.inputs;
    this.imageLoader = props.imageLoader;
  }

  public drawBackground = () => {
    const { ctx } = Options.getCanvasOptions();
    const sizes = this.getSizes();

    ctx.fillStyle = this.background;
    ctx.fillRect(0, 0, sizes.width, sizes.height);
  };

  public setTerrain = (cb: (params: TerrainParams) => Terrain[]) => {
    this.terrain = cb({ imageLoader: this.imageLoader, gravity: this.gravity });
  };

  public setInteractions = (cb: (props: InteractionParams) => Interaction[]) => {
    this.interactions = cb({ imageLoader: this.imageLoader, inputs: this.inputs, gravity: this.gravity });
  };

  public setDecoration = (cb: (props: DecorationParams) => Decoration[]) => {
    this.decorations = cb({ imageLoader: this.imageLoader });
  };

  public getTerrain = () => this.terrain;

  public getInteractions = () => this.interactions;

  public getDecoration = () => this.decorations;

  public getStart = (): TCoordinates => this.start;

  public draw() {
    const { boxes } = Options.getDebug();

    this.terrain.forEach((tile) => {
      tile.draw();
      boxes && new Rectangle(tile.getPolygon()).draw();
    });
    this.decorations.forEach((interaction) => {
      interaction.draw();
    });
    this.interactions.forEach((interaction) => {
      interaction.draw();
      boxes && new Rectangle(interaction.getPolygon()).draw();
    });
  }
}

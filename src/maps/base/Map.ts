import { TCoordinates } from '@core/types';
import { Tile } from '@objects/tiles/Tile';
import { Canvas, CanvasProps } from '@core/Canvas';
import { Inputs } from '@effects/Inputs';
import { Interaction } from '@objects/base/Interaction';

export interface MapProps extends CanvasProps {
  inputs: Inputs;
}

export abstract class Map extends Canvas {
  abstract start: TCoordinates;

  private tiles: Tile[];

  private interactions: Interaction[];

  protected inputs: Inputs;

  constructor(props: MapProps) {
    super(props);

    this.inputs = props.inputs;
  }

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

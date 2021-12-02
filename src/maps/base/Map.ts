import { TCoordinates } from '@core/types';
import { Canvas, CanvasProps } from '@core/Canvas';
import { Inputs } from '@core/Inputs';
import { Interaction } from '@objects/base/Interaction';
import { AssetsLoader } from '@core/Assets/AssetsLoader';
import { Options } from '@core/Options';
import { Decoration } from '@objects/base/Decoration';
import { Terrain } from '@objects/base/Terrain';
import { Gravity } from '@physic/Gravity';
import { Rectangle } from '@geometry/Rectangle';
import { Enemy } from '@objects/base/Enemy/Enemy';
import { MovingGameObject } from '@objects/base/MovingGameObject';
import { Player } from '@objects/special/Player';

interface TerrainParams {
  assetsLoader: AssetsLoader;
  gravity: Gravity;
}

interface InteractionParams {
  inputs: Inputs;
  assetsLoader: AssetsLoader;
  gravity: Gravity;
}

interface DecorationParams {
  assetsLoader: AssetsLoader;
}

interface EnemiesParams {
  inputs: Inputs;
  assetsLoader: AssetsLoader;
  gravity: Gravity;
  player: Player;
}

export interface MapProps extends CanvasProps {
  inputs: Inputs;
  assetsLoader: AssetsLoader;
  gravity: Gravity;
  player: Player;
}

export abstract class Map extends Canvas {
  protected abstract start: TCoordinates;

  private terrain: Terrain[] = [];
  private interactions: Interaction[] = [];
  private decorations: Decoration[] = [];
  private enemies: Enemy[] = [];

  protected movingObjects: MovingGameObject[];
  protected assetsLoader: AssetsLoader;
  protected inputs: Inputs;
  protected gravity: Gravity;
  protected player: Player;

  protected background = '#80b0bc';

  protected constructor(props: MapProps) {
    super(props);

    this.gravity = props.gravity;
    this.inputs = props.inputs;
    this.assetsLoader = props.assetsLoader;
    this.player = props.player;
  }

  public drawBackground = () => {
    const { ctx } = Options.getCanvasOptions();
    const sizes = this.getSizes();

    ctx.fillStyle = this.background;
    ctx.fillRect(0, 0, sizes.width, sizes.height);
  };

  public setTerrain = (cb: (params: TerrainParams) => Terrain[]) => {
    this.terrain = cb({ assetsLoader: this.assetsLoader, gravity: this.gravity });
  };

  public setInteractions = (cb: (props: InteractionParams) => Interaction[]) => {
    this.interactions = cb({ assetsLoader: this.assetsLoader, inputs: this.inputs, gravity: this.gravity });
  };

  public setDecoration = (cb: (props: DecorationParams) => Decoration[]) => {
    this.decorations = cb({ assetsLoader: this.assetsLoader });
  };

  public setEnemies = (cb: (props: EnemiesParams) => Enemy[]) => {
    this.enemies = cb({
      assetsLoader: this.assetsLoader,
      inputs: this.inputs,
      gravity: this.gravity,
      player: this.player,
    });
  };

  public getTerrain = () => this.terrain;

  public getInteractions = () => this.interactions;

  public getDecoration = () => this.decorations;

  public getEnemies = () => this.enemies;

  public getStart = (): TCoordinates => this.start;

  public init() {
    this.terrain.forEach((tile) => tile.init());
    this.decorations.forEach((decorations) => decorations.init());
    this.interactions.forEach((interaction) => interaction.init());
  }

  public draw() {
    const { boxes } = Options.getDebug();

    this.terrain.forEach((tile) => {
      tile.draw();
      boxes && new Rectangle(tile.getPolygon()).draw();
    });
    this.decorations.forEach((decorations) => {
      decorations.draw();
    });
    this.interactions.forEach((interaction) => {
      interaction.draw();
      boxes && new Rectangle(interaction.getPolygon()).draw();
    });
  }
}

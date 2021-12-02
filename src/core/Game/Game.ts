import { Player } from '@objects/special/Player';
import { Gravity } from '@physic/Gravity';
import { Inputs } from '@core/Inputs';
import { Camera } from '@core/Camera';
import { SimpleMap } from '@maps/SimpleMap';

import { GAME_HEIGHT, GAME_WIDTH } from '@core/constants';

import { Map } from '@maps/base/Map';
import { MapInstance } from '@maps/types';
import { Canvas } from '@core/Canvas';
import { MovingGameObject } from '@objects/base/MovingGameObject';
import { Options } from '@core/Options';
import { Debug } from '@core/Debug';
import { AssetsLoader } from '@core/Assets/AssetsLoader';
import { Rectangle } from '@geometry/Rectangle';
import { Enemy } from '@objects/base/Enemy/Enemy';
import { Text } from '@objects/interface/Text';
import { Draw } from '@core/Draw';

interface GameProps {
  customMap?: MapInstance;
}

export class Game extends Canvas {
  protected width = GAME_WIDTH;
  protected height = GAME_HEIGHT;

  private reqId: number;
  private _inited = false;

  private testText: Text;

  protected assetsLoader: AssetsLoader;

  // effects
  private readonly gravity: Gravity;
  private readonly inputs: Inputs;
  private readonly camera: Camera;

  public movingObjects: MovingGameObject[] = [];
  public readonly enemies: Enemy[] = [];

  private readonly map: Map;
  private readonly player: Player;

  private readonly debug: Debug;

  public constructor(props: GameProps) {
    super(props);

    this.assetsLoader = new AssetsLoader();

    this.gravity = new Gravity();
    this.inputs = new Inputs();

    this.testText = new Text({
      x: 5,
      y: 100,
      message: ' abcdefghjiklmnopqrstuvwxyz0123456789-+=().?!',
      assetsLoader: this.assetsLoader,
    });

    this.player = new Player({
      inputs: this.inputs,
      gravity: this.gravity,
      assetsLoader: this.assetsLoader,
      x: null,
      y: null,
      enemies: this.enemies,
    });

    this.map = new (props.customMap || SimpleMap)({
      x: 0,
      y: 0,
      inputs: this.inputs,
      assetsLoader: this.assetsLoader,
      gravity: this.gravity,
      player: this.player,
    });

    const startCoordinates = this.map.getStart();

    this.camera = new Camera({ map: this.map, ...startCoordinates });

    this.enemies.push(...this.map.getEnemies());
    this.movingObjects.push(...this.enemies, this.player);

    this.debug = new Debug({ camera: this.camera, items: [this.camera, this.player] });
  }

  private boundaryCheck = (moving: MovingGameObject) => {
    const movingCoordinates = moving.getCoordinates();
    const movingSize = moving.getSizes();
    const canvasSize = this.map.getSizes();

    if (moving instanceof Player) {
      // top
      if (movingCoordinates.y < 0) {
        moving.setCoordinates({ y: 0 });
      }
      // bottom
      if (movingCoordinates.y > this.map.getSizes().height) {
        moving.setOriginalCoordinates(this.map.getStart());
        this.camera.setOriginalCoordinates(this.map.getStart());
      }
      // left
      if (movingCoordinates.x < 0) {
        moving.setCoordinates({ x: 0 });
      }
      // right
      if (movingCoordinates.x > canvasSize.width - movingSize.width) {
        moving.setCoordinates({ x: canvasSize.width - movingSize.width });
      }
    }
  };

  private drawLoader = () => {
    const { ctx } = Options.getCanvasOptions();
    const mapSizes = this.map.getSizes();

    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, mapSizes.width, mapSizes.height);
  };

  private drawError = (e: Error) => {
    const { ctx } = Options.getCanvasOptions();
    const mapSizes = this.map.getSizes();

    ctx.fillStyle = 'darkred';
    ctx.fillRect(0, 0, mapSizes.width, mapSizes.height);

    ctx.font = '48px serif';
    ctx.fillStyle = 'white';
    ctx.fillText(e.message, Draw.getPixels(20), Draw.getPixels(25));

    ctx.font = '18px serif';

    e.stack.split('\n').forEach((item, index) => {
      ctx.fillText(item, Draw.getPixels(20), Draw.getPixels(40 + (index * 6)));
    });
  };

  public animate = () => {
    this.movingObjects.forEach((movingObject) => movingObject.animate());
    this.map.getInteractions().forEach((interaction) => interaction.animate());
  };

  public effects = () => {
    this.camera.boundaryCheck(this.player);
    this.camera.effect();

    this.movingObjects.forEach((movingObject) => {
      this.boundaryCheck(movingObject);

      movingObject.physic.movingEffect();
      movingObject.effects();

      // this.movingObjects
      //   .filter((item) => item !== movingObject)
      //   .forEach((item) => movingObject.effects(item));

      this.map.getTerrain().forEach((terrain) => terrain.effects(movingObject));
      this.map.getInteractions().forEach((interaction) => interaction.effects(movingObject));
    });
  };

  public inputEffects = () => {
    this.player.inputEffects();
    this.map.getInteractions().forEach((interaction) => interaction.inputEffects());
  };

  public init() {
    this.testText.init();
    this.map.init();
    this.movingObjects.forEach((item) => item.init());

    this._inited = true;
  }

  public draw = () => {
    try {
      this.reqId = requestAnimationFrame(this.draw);

      const debug = Options.getDebug();

      if (!this._inited && this.assetsLoader.isLoaded()) {
        this.init();
      }

      if (!this.assetsLoader.isLoaded() || !this._inited) {
        this.drawLoader();
        return;
      }

      this.map.drawBackground();
      this.inputEffects();
      this.effects();
      this.animate();
      this.map.draw();

      this.testText.draw();

      this.movingObjects.forEach((movingObject) => {
        movingObject.draw();
        debug.boxes && new Rectangle(movingObject.getPolygon()).draw();
      });

      if (debug.coordinates) {
        this.debug.drawCoordinates();
      }

      if (debug.info) {
        this.debug.drawInfo();
      }
    } catch (e) {
      cancelAnimationFrame(this.reqId);
      this.drawError(e);
      console.error(e);
    }
  };
}

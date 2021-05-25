import { Player } from '@objects/Player/Player';
import { Gravity } from '@effects/Gravity';
import { Inputs } from '@effects/Inputs';
import { Camera } from '@effects/Camera';
import { SimpleMap } from '@maps/SimpleMap';

import { GAME_HEIGHT, GAME_WIDTH } from '@core/constants';

import { Map } from '@maps/base/Map';
import { MapInstance } from '@maps/types';
import { Canvas } from '@core/Canvas';
import { MovingGameObject } from '@objects/base/MovingGameObject';
import { Options } from '@core/Options';
import { Debug } from '@core/Debug';
import { ImageLoader } from '@core/ImageLoader';
import { Rectangle } from '@geometry/Rectangle';

interface GameProps {
  customMap?: MapInstance;
}

export class Game extends Canvas {
  protected width = GAME_WIDTH;
  protected height = GAME_HEIGHT;

  protected imageLoader: ImageLoader;

  // effects
  private readonly gravity: Gravity;
  private readonly inputs: Inputs;
  private readonly camera: Camera;

  private readonly movingObjects: MovingGameObject[];

  private readonly map: Map;
  private readonly player: Player;

  private readonly debug: Debug;

  public constructor(props: GameProps) {
    super(props);

    this.imageLoader = new ImageLoader();

    this.gravity = new Gravity();
    this.inputs = new Inputs();

    this.map = new (props.customMap || SimpleMap)({
      x: 0,
      y: 0,
      inputs: this.inputs,
      imageLoader: this.imageLoader,
      gravity: this.gravity,
    });

    const startCoordinates = this.map.getStart();

    this.camera = new Camera({ map: this.map, ...startCoordinates });

    this.player = new Player({
      inputs: this.inputs,
      gravity: this.gravity,
      imageLoader: this.imageLoader,
      ...startCoordinates,
    });

    this.movingObjects = [this.player];

    this.debug = new Debug({ camera: this.camera, items: [this.camera, this.player] });
  }

  public draw = () => {
    requestAnimationFrame(this.draw);

    const debug = Options.getDebug();

    if (!this.imageLoader.isLoaded()) {
      this.drawLoader();
      return;
    }

    this.map.drawBackground();
    this.inputEffects();
    this.effects();
    this.animate();
    this.map.draw();

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
  };

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

  public animate = () => {
    this.movingObjects.forEach((movingObject) => movingObject.animate());
    this.map.getInteractions().forEach((interaction) => interaction.animate());
  };

  public effects = () => {
    this.camera.boundaryCheck(this.player);
    this.camera.effect();

    this.movingObjects.forEach((movingObject) => {
      this.boundaryCheck(movingObject);

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

  private drawLoader = () => {
    const { ctx } = Options.getCanvasOptions();
    const mapSizes = this.map.getSizes();

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, mapSizes.width, mapSizes.height);
  };
}

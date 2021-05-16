import { Player } from '@objects/Player/Player';
import { Gravity } from '@effects/Gravity';
import { Inputs } from '@effects/Inputs';
import { Camera } from '@effects/Camera';
import { SimpleMap } from '@maps/SimpleMap';

import { GAME_HEIGHT, GAME_WIDTH } from '@core/constants';

import { Map, MapProps } from '@maps/base/Map';
import { Canvas } from '@core/Canvas';
import { MovingGameObject } from '@objects/base/MovingGameObject';
import { Options } from '@core/Options';
import { Debug } from '@core/Debug';
import { ImageLoader } from '@core/ImageLoader';

interface GameProps {
  debug?: boolean;
  customMap?: { new(props: MapProps): Map };
}

// debug
const maxRedraw = 60;
let curDraw = 0;

export class Game extends Canvas {
  width = GAME_WIDTH;
  height = GAME_HEIGHT;

  imageLoader: ImageLoader;

  // effects
  gravity: Gravity;
  inputs: Inputs;
  camera: Camera;

  movingObjects: MovingGameObject[];

  map: Map;
  player: Player;

  debug: Debug;

  constructor(props: GameProps) {
    super(props);

    this.imageLoader = new ImageLoader();

    this.gravity = new Gravity();
    this.inputs = new Inputs();

    this.map = new (props.customMap || SimpleMap)({ x: 0, y: 0, inputs: this.inputs, imageLoader: this.imageLoader });

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
    const debug = Options.getDebug();
    // debug
    // eslint-disable-next-line no-constant-condition
    if (false) {
      curDraw++;
      if (curDraw > maxRedraw) {
        return;
      }
    }
    requestAnimationFrame(this.draw);

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

  animate = () => {
    this.movingObjects.forEach((movingObject) => movingObject.animate());
    this.map.getInteractions().forEach((interaction) => interaction.animate());
  };

  effects = () => {
    this.camera.boundaryCheck(this.player);
    this.camera.effect();

    this.movingObjects.forEach((movingObject) => {
      this.boundaryCheck(movingObject);

      movingObject.effects();

      this.map.getTerrain().forEach((terrain) => terrain.boundaryCheck(movingObject));
      this.map.getInteractions().forEach((interaction) => interaction.boundaryCheck(movingObject));
    });
  };

  inputEffects = () => {
    this.movingObjects.forEach((movingObject) => movingObject.inputEffects());
    this.map.getInteractions().forEach((interaction) => interaction.inputEffects());
  };

  private drawLoader = () => {
    const { ctx } = Options.getCanvasOptions();
    const mapSizes = this.map.getSizes();

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, mapSizes.width, mapSizes.height);
  };
}

import { Player } from '@objects/Player/Player';
import { Gravity } from '@effects/Gravity';
import { Inputs } from '@effects/Inputs';
import { Camera } from '@effects/Camera';
import { SimpleMap } from '@maps/SimpleMap';

import { GAME_HEIGHT, GAME_WIDTH, LINE_WIDTH } from '@core/constants';

import { Map } from '@maps/base/Map';
import { Canvas, InitProps } from '@core/Canvas';
import { MovingGameObject } from '@objects/base/MovingGameObject';
import { GameObject } from '@objects/base/GameObject';

interface DebugInfo {
  key: string;
  text: string;
}

interface GameProps {
  canvasId: string;
  debug?: boolean;
  customMap?: typeof SimpleMap; // todo
}

const getCanvas = (canvasId: string): InitProps => {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');

  const cellSize = ((canvas.width * canvas.height) / (GAME_WIDTH * GAME_HEIGHT)) * LINE_WIDTH;

  return {
    canvas,
    ctx,
    cellSize,
  };
};

// debug
const maxRedraw = 60;
let curDraw = 0;

export class Game extends Canvas {
  width = GAME_WIDTH / LINE_WIDTH;

  height = GAME_HEIGHT / LINE_WIDTH;

  background = 'lightblue';

  // effects
  gravity: Gravity;

  inputs: Inputs;

  camera: Camera;

  movingObjects: MovingGameObject[];

  map: Map;

  player: Player;

  debug: boolean;

  info: Record<string, boolean> = {};

  constructor(props: GameProps) {
    super(props);

    super.init(getCanvas(props.canvasId));

    this.gravity = new Gravity();
    this.inputs = new Inputs();

    this.map = new (props.customMap || SimpleMap)({ inputs: this.inputs, x: null, y: null });

    this.camera = new Camera({ map: this.map, x: null, y: null });

    const startCoordinates = this.map.getStart();

    this.debug = props.debug;

    this.player = new Player({
      inputs: this.inputs,
      gravity: this.gravity,
      x: startCoordinates.x,
      y: startCoordinates.y,
    });

    this.movingObjects = [this.player];
  }

  private getDebugInfo = (gameObject: GameObject): DebugInfo => {
    const coordinates = gameObject.getCoordinates();
    return {
      key: gameObject.constructor.name,
      text: `${gameObject.constructor.name}: x=${coordinates.x} y=${coordinates.y}`,
    };
  };

  private drawInfo = ({ key, text }: DebugInfo) => {
    const cameraCoordinates = this.camera.selectedCoordinates;
    const { ctx } = this.getCanvasOptions();

    this.info[key] = true;
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.font = '14px arial';
    ctx.fillText(text, 5 - cameraCoordinates.x, 20 + 20 * Object.keys(this.info).indexOf(key) - cameraCoordinates.y);

    ctx.fill();
  };

  public draw = () => {
    // debug
    // eslint-disable-next-line no-constant-condition
    if (false) {
      curDraw++;
      if (curDraw > maxRedraw) {
        return;
      }
    }
    requestAnimationFrame(this.draw);

    this.drawBackground();
    this.inputEffects();
    this.effects();
    this.map.draw();

    this.movingObjects.forEach((movingObject) => {
      movingObject.draw();
    });

    if (this.debug) {
      this.camera.draw();

      this.drawInfo({ key: 'debug', text: `debug: ${this.debug}` });
      this.drawInfo(this.getDebugInfo(this.camera));
      this.drawInfo(this.getDebugInfo(this.player));
    }
  };

  private boundaryCheck = (moving: MovingGameObject) => {
    const movingCoordinates = moving.getCoordinates();
    const movingSize = moving.getSizes();
    const canvasSize = this.map.getSizes();

    // top
    if (movingCoordinates.y < 0) {
      moving.setCoordinates({ y: 0 });
    }
    // bottom
    if (movingCoordinates.y > canvasSize.height - movingSize.height) {
      moving.setCoordinates({ y: canvasSize.height - movingSize.height });
    }
    // left
    if (movingCoordinates.x < 0) {
      moving.setCoordinates({ x: 0 });
    }
    // right
    if (movingCoordinates.x > canvasSize.width - movingSize.width) {
      moving.setCoordinates({ x: canvasSize.width - movingSize.width });
    }
  };

  effects = () => {
    this.camera.boundaryCheck(this.player);
    this.camera.effect();

    this.movingObjects.forEach((movingObject) => {
      this.boundaryCheck(movingObject);

      movingObject.effects();

      this.map.getTiles().forEach((tile) => tile.boundaryCheck(movingObject));
      this.map.getInteractions().forEach((interaction) => interaction.boundaryCheck(movingObject));
    });
  };

  inputEffects = () => {
    this.movingObjects.forEach((movingObject) => movingObject.inputEffects());
    this.map.getInteractions().forEach((interaction) => interaction.inputEffects());
  };

  drawBackground = () => {
    const { ctx } = this.getCanvasOptions();
    const mapSizes = this.map.getSizes();

    ctx.fillStyle = this.background;
    ctx.fillRect(0, 0, mapSizes.width, mapSizes.height);
  };
}

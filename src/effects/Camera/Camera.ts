import { Map } from '@maps/base/Map';
import { Player } from '@objects/Player';
import { GAME_HEIGHT, GAME_WIDTH } from '@core/constants';
import { Canvas, CanvasProps } from '@core/Canvas';
import { TCoordinates, TPaddings } from '@core/types';
import { Options } from '@core/Options';
import { Draw } from '@core/Draw';

interface CameraProps extends CanvasProps {
  map: Map,
}

export class Camera extends Canvas {
  protected width = GAME_WIDTH;
  protected height = GAME_HEIGHT;

  public selectedCoordinates: TCoordinates = { x: 0, y: 0 };

  private map: Map;

  private readonly speed = Draw.getPixels(1.2);

  private paddings: TPaddings = {
    top: GAME_HEIGHT / 2,
    right: GAME_WIDTH / 2,
    bottom: GAME_HEIGHT / 2,
    left: GAME_WIDTH / 2,
  };

  public constructor(props: CameraProps) {
    super(props);

    this.x = props.x - this.width / 2;

    this.map = props.map;
  }

  private getPaddings = (): TPaddings => {
    const { cellSize } = Options.getCanvasOptions();

    return {
      top: this.paddings.top * cellSize,
      right: this.paddings.right * cellSize,
      bottom: this.paddings.bottom * cellSize,
      left: this.paddings.left * cellSize,
    };
  };

  public boundaryCheck(player: Player) {
    const cameraCoordinates = this.getCoordinates();
    const cameraSizes = this.getSizes();
    const playerSizes = player.getSizes();
    const playerCoordinates = player.getCoordinates();
    const paddings = this.getPaddings();
    const mapSize = this.map.getSizes();

    const newCoordinates = { ...cameraCoordinates };

    if (playerCoordinates.x + playerSizes.width > cameraCoordinates.x + cameraSizes.width - paddings.right) {
      newCoordinates.x += this.speed;
    }

    if (playerCoordinates.x < cameraCoordinates.x + paddings.left) {
      newCoordinates.x -= this.speed;
    }

    if (playerCoordinates.y + playerSizes.height < cameraCoordinates.y + paddings.top) {
      newCoordinates.y -= this.speed;
    }

    if (playerCoordinates.y > cameraCoordinates.y + cameraSizes.height - paddings.bottom) {
      newCoordinates.y += this.speed;
    }

    // top
    if (newCoordinates.y < 0) {
      newCoordinates.y = 0;
    }
    // right
    if (newCoordinates.x + cameraSizes.width > mapSize.width) {
      newCoordinates.x = mapSize.width - cameraSizes.width;
    }
    // bottom
    if (newCoordinates.y + cameraSizes.height > mapSize.height) {
      newCoordinates.y = mapSize.height - cameraSizes.height;
    }
    // left
    if (newCoordinates.x < 0) {
      newCoordinates.x = 0;
    }

    if (newCoordinates.x !== cameraCoordinates.x || newCoordinates.y !== cameraCoordinates.y) {
      this.setCoordinates(newCoordinates);
    }
  }

  public effect = () => {
    const { ctx } = Options.getCanvasOptions();
    const coordinates = this.getCoordinates();

    ctx.translate(this.selectedCoordinates.x - coordinates.x, this.selectedCoordinates.y - coordinates.y);

    if (this.selectedCoordinates.x !== coordinates.x) {
      this.selectedCoordinates.x = coordinates.x;
    }

    if (this.selectedCoordinates.y !== coordinates.y) {
      this.selectedCoordinates.y = coordinates.y;
    }
  };

  public draw = () => {};
}

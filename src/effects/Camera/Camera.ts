import { Map } from '@maps/base/Map';
import { Player } from '@objects/Player';
import { GAME_HEIGHT, GAME_WIDTH } from '@core/constants';
import { Canvas, CanvasProps } from '@core/Canvas';
import { TCoordinates, TPaddings } from '@core/types';
import { Options } from '@core/Options';

interface CameraProps extends CanvasProps {
  map: Map,
}

export class Camera extends Canvas {
  protected width = GAME_WIDTH;
  protected height = GAME_HEIGHT;

  public selectedCoordinates: TCoordinates = { x: 0, y: 0 };

  private map: Map;

  private paddings: TPaddings = {
    top: 20,
    right: 70,
    bottom: 20,
    left: 70,
  };

  constructor(props: CameraProps) {
    super(props);

    this.map = props.map;

    this.setCoordinates({
      x: 0,
      y: 0,
    });
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
    const cameraSizes = this.getSizes();
    const playerSizes = player.getSizes();
    const playerCoordinates = player.getCoordinates();

    const paddings = this.getPaddings();

    const mapSize = this.map.getSizes();

    const realPlayerCoordinates = {
      x: playerCoordinates.x + this.selectedCoordinates.x,
    };

    if (realPlayerCoordinates.x + playerSizes.width > cameraSizes.width - paddings.right) {
      const x = (cameraSizes.width - paddings.right) - (playerCoordinates.x + playerSizes.width);
      if (-x <= mapSize.width - cameraSizes.width) this.setCoordinates({ x });
    }

    if (playerCoordinates.x + this.selectedCoordinates.x < paddings.left) {
      const x = paddings.left - playerCoordinates.x;

      if (x <= 0) this.setCoordinates({ x });
    }
  }

  public effect = () => {
    const { ctx } = Options.getCanvasOptions();

    const coordinates = this.getCoordinates();

    if (this.selectedCoordinates.x !== coordinates.x) {
      ctx.translate(coordinates.x - this.selectedCoordinates.x, this.selectedCoordinates.y);
      this.selectedCoordinates.x = coordinates.x;
    }

    if (this.selectedCoordinates.y !== coordinates.y) {
      ctx.translate(this.selectedCoordinates.x, this.selectedCoordinates.y - coordinates.y);
      this.selectedCoordinates.y = coordinates.y;
    }
  };

  public draw = () => {
    return;

    const { ctx, cellSize } = Options.getCanvasOptions();

    const sizes = this.getSizes();
    const paddings = this.getPaddings();

    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = cellSize;
    ctx.setLineDash([15, 20]);

    ctx.moveTo(paddings.left - this.selectedCoordinates.x, 0);
    ctx.lineTo(paddings.left - this.selectedCoordinates.x, sizes.height);

    ctx.moveTo(sizes.width - paddings.right - this.selectedCoordinates.x, 0);
    ctx.lineTo(sizes.width - paddings.right - this.selectedCoordinates.x, sizes.height);

    ctx.stroke();
    ctx.setLineDash([]);
  };
}

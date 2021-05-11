import { MovingGameObject } from '@objects/base/MovingGameObject';
import { outerSquire } from '@objects/__presets/boundaryCheck';
import { Tile, TileProps } from './Tile';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface RockProps extends TileProps {}

export class Rock extends Tile {
  public boundaryCheck(movingObject: MovingGameObject) {
    outerSquire(this, movingObject);
  }

  public draw() {
    const { ctx } = this.getCanvasOptions();

    const coordinates = this.getCoordinates();
    const sizes = this.getSizes();

    ctx.fillStyle = 'darkgrey';
    ctx.beginPath();

    const radius = sizes.width / 4;

    ctx.arc(coordinates.x, coordinates.y, radius, 0, Math.PI, true);

    ctx.fill();
  }
}

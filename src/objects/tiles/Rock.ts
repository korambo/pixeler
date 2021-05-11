import { MovingGameObject } from '@objects/base/MovingGameObject';
import { Tile, TileProps } from './Tile';
import { outerSquire } from '@objects/__presets/boundaryCheck';

interface RockProps extends TileProps {}

export class Rock extends Tile {
  constructor(props: RockProps) {
    super(props);
  }

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
import { MovingGameObject } from '@objects/base/MovingGameObject';
import { atRectangle } from '@objects/__presets/boundaryCheck';
import { Rectangle } from '@geometry/Rectangle';
import { Options } from '@core/Options';
import { Tile, TileProps } from '../base/Tile';

interface TerrainProps extends TileProps {
  color?: [string, string],
  onlyTopBorder?: boolean,
}

export class Terrain extends Tile {
  private onlyTopBorder: boolean = false;

  private colors: Array<[string, string]> = [
    ['#e040fb', '#aa00ff'],
    ['#009688', '#00796b'],
    ['#cddc39', '#afb42b'],
    ['#0097a7', '#006064'],
    ['#c2185b', '#880e4f'],
    ['#ef5350', '#d32f2f'],
  ];

  private readonly currentColor: [string, string];

  constructor(props: TerrainProps) {
    super(props);

    if (typeof props.onlyTopBorder !== 'undefined') this.onlyTopBorder = props.onlyTopBorder;

    this.currentColor = props.color || this.getColor();
  }

  private getColor = () => this.colors[Math.floor(Math.random() * this.colors.length)];

  public boundaryCheck(movingObject: MovingGameObject) {
    atRectangle(this, movingObject);
  }

  public draw() {
    const { cellSize } = Options.getCanvasOptions();
    const coordinates = this.getCoordinates();
    const sizes = this.getSizes();

    const parts = [
      new Rectangle({
        width: sizes.width,
        height: sizes.height,
        x: coordinates.x,
        y: coordinates.y,
        color: this.currentColor[0],
        filled: true,
      }),
      new Rectangle({
        width: sizes.width,
        height: this.onlyTopBorder ? cellSize : sizes.height,
        x: coordinates.x,
        y: coordinates.y,
        color: this.currentColor[1],
        filled: this.onlyTopBorder,
      }),
    ];

    parts.forEach((part) => part.draw());
  }
}

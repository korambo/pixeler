import { TCoordinates, TPolygon, TSizes } from '@core/types';
import { Options } from '@core/Options';

export interface CanvasProps extends TCoordinates {}

export abstract class Canvas {
  protected x: number;
  protected y: number;

  protected abstract width: number;
  protected abstract height: number;

  public constructor(props) {
    this.x = props.x;
    this.y = props.y;
  }

  public abstract init(): void;

  public abstract draw(): void;

  public setSizes = (sizes: Partial<TSizes>) => {
    const { cellSize } = Options.getCanvasOptions();

    if (sizes.width) this.width = sizes.width / cellSize;
    if (sizes.height) this.height = sizes.height / cellSize;
  };

  public getSizes = (): TSizes => {
    const { cellSize } = Options.getCanvasOptions();

    return {
      width: this.width * cellSize,
      height: this.height * cellSize,
    };
  };

  public setCoordinates = (coordinates: Partial<TCoordinates>) => {
    const { cellSize } = Options.getCanvasOptions();

    // удалить деление
    if (typeof coordinates.x === 'number') this.x = coordinates.x / cellSize;
    if (typeof coordinates.y === 'number') this.y = coordinates.y / cellSize;
  };

  // remove
  public setOriginalCoordinates = (coordinates: Partial<TCoordinates>) => {
    if (typeof coordinates.x === 'number') this.x = coordinates.x;
    if (typeof coordinates.y === 'number') this.y = coordinates.y;
  };

  public getCoordinates(): TCoordinates {
    const { cellSize } = Options.getCanvasOptions();

    return {
      x: this.x * cellSize,
      y: this.y * cellSize,
    };
  }

  public getPolygon = (): TPolygon => ({
    ...this.getCoordinates(),
    ...this.getSizes(),
  });
}

import { Edge, TCoordinates, TPaddings, TPolygon, TSizes } from '@core/types';
import { Options } from '@core/Options';

export interface CanvasProps extends TCoordinates {}

export abstract class Canvas {
  protected edgeSize = Options.getCanvasOptions().cellSize * 2;

  protected x: number;
  protected y: number;

  protected abstract width: number;
  protected abstract height: number;

  constructor(props) {
    this.x = props.x;
    this.y = props.y;
  }

  abstract draw(): void;

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

  public getOriginalSizes = () => ({
    width: this.width,
    height: this.height,
  });

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

  public getPolygon(paddings?: Partial<TPaddings>): TPolygon {
    const sizes = this.getSizes();
    const coordinates = this.getCoordinates();

    let polygon: TPolygon = [
      [coordinates.x, coordinates.y],
      [coordinates.x + sizes.width, coordinates.y],
      [coordinates.x + sizes.width, coordinates.y + sizes.height],
      [coordinates.x, coordinates.y + sizes.height],
    ];

    if (paddings) {
      const resPaddings = { top: 0, right: 0, bottom: 0, left: 0, ...paddings };

      polygon = [
        [polygon[0][0] - resPaddings.left, polygon[0][1] - resPaddings.top],
        [polygon[1][0] + resPaddings.right, polygon[1][1] - resPaddings.top],
        [polygon[2][0] + resPaddings.right, polygon[2][1] + resPaddings.bottom],
        [polygon[3][0] - resPaddings.left, polygon[3][1] + resPaddings.bottom],
      ];
    }

    return polygon;
  }

  // eslint-disable-next-line consistent-return
  public getEdgePolygon(edge: Edge): TPolygon {
    const sizes = this.getSizes();
    const coordinates = this.getCoordinates();

    switch (edge) {
      case Edge.top: {
        return [
          [coordinates.x, coordinates.y],
          [coordinates.x + sizes.width, coordinates.y],
          [coordinates.x + sizes.width, coordinates.y + this.edgeSize],
          [coordinates.x, coordinates.y + this.edgeSize],
        ];
      }
      case Edge.right: {
        return [
          [coordinates.x + sizes.width - this.edgeSize, coordinates.y],
          [coordinates.x + sizes.width, coordinates.y],
          [coordinates.x + sizes.width, coordinates.y + sizes.height],
          [coordinates.x + sizes.width - this.edgeSize, coordinates.y + sizes.height],
        ];
      }
      case Edge.bottom: {
        return [
          [coordinates.x, coordinates.y + sizes.height],
          [coordinates.x + sizes.width, coordinates.y + sizes.height],
          [coordinates.x + sizes.width, coordinates.y + sizes.height - this.edgeSize],
          [coordinates.x, coordinates.y + sizes.height - this.edgeSize],
        ];
      }
      case Edge.left: {
        return [
          [coordinates.x, coordinates.y],
          [coordinates.x + this.edgeSize, coordinates.y],
          [coordinates.x + this.edgeSize, coordinates.y + sizes.height],
          [coordinates.x, coordinates.y + sizes.height],
        ];
      }
    }
  }
}

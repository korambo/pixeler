import {
  Edge, TCoordinates, TPolygon, TSizes,
} from '@core/types';
import { LINE_WIDTH } from '@core/constants';

export interface CanvasProps extends TCoordinates {}

export interface InitProps {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D
  cellSize: number;
}

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let cellSize: number;

export abstract class Canvas {
  private x: number;

  private y: number;

  protected edgeSize = LINE_WIDTH * 2;

  protected abstract width: number;

  protected abstract height: number;

  constructor(props) {
    this.x = props.x;
    this.y = props.y;
  }

  abstract draw(): void;

  // eslint-disable-next-line class-methods-use-this
  public init(props: InitProps) {
    canvas = props.canvas;
    ctx = props.ctx;
    cellSize = props.cellSize;
  }

  public getCanvasOptions = () => {
    if (!canvas || !ctx || !cellSize) {
      throw new Error('Canvas not init!');
    }

    return {
      canvas,
      ctx,
      cellSize,
    };
  };

  public setSizes = (sizes: Partial<TSizes>) => {
    if (sizes.width) this.width = sizes.width / cellSize;
    if (sizes.height) this.height = sizes.height / cellSize;
  };

  public getSizes = (): TSizes => ({
    width: this.width * cellSize,
    height: this.height * cellSize,
  });

  public getOriginalSizes = () => ({
    width: this.width,
    height: this.height,
  });

  public setCoordinates = (coordinates: Partial<TCoordinates>) => {
    if (typeof coordinates.x === 'number') this.x = coordinates.x / cellSize;
    if (typeof coordinates.y === 'number') this.y = coordinates.y / cellSize;
  };

  public getCoordinates(): TCoordinates {
    return {
      x: this.x * cellSize,
      y: this.y * cellSize,
    };
  }

  public getPolygon(): TPolygon {
    const sizes = this.getSizes();
    const coordinates = this.getCoordinates();

    return [
      [coordinates.x, coordinates.y],
      [coordinates.x + sizes.width, coordinates.y],
      [coordinates.x + sizes.width, coordinates.y + sizes.height],
      [coordinates.x, coordinates.y + sizes.height],
    ];
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

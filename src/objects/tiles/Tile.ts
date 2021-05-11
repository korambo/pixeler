import { GameObject, GameObjectProps } from '@objects/base/GameObject';
import { TSizes } from '@core/types';

export interface TileProps extends GameObjectProps, TSizes {}

export abstract class Tile extends GameObject {
  width = null;
  height = null;

  protected constructor(props: TileProps) {
    super(props);

    const { cellSize } = this.getCanvasOptions();

    this.setSizes({
      width: props.width * cellSize,
      height: props.height * cellSize,
    });
  }
}
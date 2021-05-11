import { GameObject, GameObjectProps } from '@objects/base/GameObject';
import { TSizes } from '@core/types';
import { Options } from '@core/Options';

export interface TileProps extends GameObjectProps, TSizes {}

export abstract class Tile extends GameObject {
  width = null;

  height = null;

  constructor(props: TileProps) {
    super(props);

    const { cellSize } = Options.getCanvasOptions();

    this.setSizes({
      width: props.width * cellSize,
      height: props.height * cellSize,
    });
  }
}

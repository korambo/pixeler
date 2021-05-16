import { Draw } from '@core/Draw';
import { TILE_SIZE } from '@core/constants';

import { Tile, TileProps, TileType } from '../../base/Tile';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface GroundProps extends TileProps {}

export class Ground extends Tile {
  protected init() {
    let img: HTMLImageElement;

    switch (this.type) {
      case TileType.inner: {
        img = this.imageLoader.getImage('ground_inner.svg');
        break;
      }
      case TileType.outer: {
        img = this.imageLoader.getImage('ground_outer.svg');
      }
    }

    this.setPattern(Draw.getPattern(img, { width: TILE_SIZE, height: TILE_SIZE }));
  }
}

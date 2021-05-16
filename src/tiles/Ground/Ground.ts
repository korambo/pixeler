import { Tile, TileProps } from '@tiles/base/Tile';
import { TileType } from '@tiles/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface GroundProps extends TileProps {}

export class Ground extends Tile {
  protected sprite = {
    [TileType.inner]: 'ground_inner.svg',
    [TileType.outerTop]: 'ground_outer.svg',
    [TileType.outerRight]: 'ground_outer_right.svg',
    [TileType.outerLeft]: 'ground_outer_left.svg',
    [TileType.innerRight]: 'ground_inner_right.svg',
    [TileType.innerLeft]: 'ground_inner_left.svg',
  };
}

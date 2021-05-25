import { Tile, TileProps } from '@tiles/base/Tile';

export enum TileType {
  outerRight = 'outerRight',
  outerLeft = 'outerLeft',
  outerTop = 'outerTop',
  inner = 'inner',
  innerRight = 'innerRight',
  innerLeft = 'innerLeft',
}

export type TileInstance = { new(props: TileProps): Tile };

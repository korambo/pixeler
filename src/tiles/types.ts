import { Tile, TileProps } from '@tiles/base/Tile';

export enum TileType {
  innerTopLeft = 'innerTopLeft',
  innerTop = 'innerTop',
  innerTopRight = 'innerTopRight',

  outerTopLeft = 'outerTopLeft',
  outerTop = 'outerTop',
  outerTopRight = 'outerTopRight',

  left = 'left',
  inner = 'inner',
  right = 'right',
  bottomLeft = 'bottomLeft',
  bottom = 'bottom',
  bottomRight = 'bottomRight',

  fullOuter = 'fullOuter',
  fullInner = 'fullInner',

  horizontalInnerLeft = 'horizontalInnerLeft',
  horizontalInner = 'horizontalInner',
  horizontalInnerRight = 'horizontalInnerRight',

  horizontalOuterLeft = 'horizontalOuterLeft',
  horizontalOuter = 'horizontalOuter',
  horizontalOuterRight = 'horizontalOuterRight',

  verticalInnerTop = 'verticalInnerTop',
  verticalOuterTop = 'verticalOuterTop',
  verticalInner = 'verticalInner',
  verticalBottom = 'verticalBottom',
}

export type TileInstance = { new(props: TileProps): Tile };

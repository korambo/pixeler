import { Terrain } from '@objects/tiles/Terrain';
import { Rock } from '@objects/tiles/Rock';
import { GAME_HEIGHT } from '@core/constants';

import { Map, MapProps } from '@maps/base/Map';
import { Chest } from '@objects/Chest';

export class SimpleMap extends Map {
  protected width = 500;
  protected height = GAME_HEIGHT;

  protected start = { x: 20, y: 50 };

  constructor(props: MapProps) {
    super(props);

    const sizes = this.getOriginalSizes();

    this.setTiles([
      ...new Array(10).fill(null).map((_, i) => (
        new Terrain({ width: 20, height: 10, x: 12 + i * 28, y: 150 - i * 10 })
      )),

      new Rock({
        width: 30, height: 10, x: 180, y: GAME_HEIGHT - 20,
      }),
      new Rock({
        width: 25, height: 10, x: 200, y: GAME_HEIGHT - 20,
      }),

      new Rock({
        width: 30, height: 10, x: 340, y: GAME_HEIGHT - 20,
      }),
      new Rock({
        width: 25, height: 10, x: 320, y: GAME_HEIGHT - 20,
      }),

      new Terrain({
        width: sizes.width, height: 20, x: 0, y: GAME_HEIGHT - 20, color: ['#b45333', '#83d34f'], onlyTopBorder: true,
      }),
    ]);

    this.setInteractions([
      new Chest({ inputs: props.inputs, x: 70, y: 145 }),
      new Chest({ inputs: props.inputs, x: 100, y: 145, open: true }),
      new Chest({ inputs: props.inputs, x: 130, y: 145, open: true, empty: true }),
    ]);
  }
}

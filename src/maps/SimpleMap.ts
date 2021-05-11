import { Terrain } from '@objects/tiles/Terrain';
import { Rock } from '@objects/tiles/Rock';
import { GAME_HEIGHT, LINE_WIDTH } from '@core/constants';

import { Map, MapProps } from '@maps/base/Map';
import { Chest } from '@objects/Chest';

export class SimpleMap extends Map {
  protected width = 500;
  protected height = GAME_HEIGHT / LINE_WIDTH;

  protected start = { x: 20, y: 50 };

  constructor(props: MapProps) {
    super(props);

    const sizes = this.getOriginalSizes();

    this.setTiles([
      // ...new Array(10).fill(null).map((_, i) => (
      //   new Terrain({ width: 20, height: 10, x: 12 + i * 28, y: 130 - i * 10 })
      // )),

      new Rock({
        width: 30, height: 10, x: 150, y: 140,
      }),
      new Rock({
        width: 25, height: 10, x: 170, y: 140,
      }),

      new Rock({
        width: 30, height: 10, x: 340, y: 140,
      }),
      new Rock({
        width: 25, height: 10, x: 320, y: 140,
      }),

      new Terrain({
        width: sizes.width, height: 20, x: 0, y: 140, color: ['#b45333', '#83d34f'], onlyTopBorder: true,
      }),
    ]);

    this.setInteractions([
      new Chest({ inputs: props.inputs, x: 60, y: 125 }),
      new Chest({
        inputs: props.inputs, x: 90, y: 125, open: true,
      }),
      new Chest({
        inputs: props.inputs, x: 120, y: 125, open: true, empty: true,
      }),
    ]);
  }
}

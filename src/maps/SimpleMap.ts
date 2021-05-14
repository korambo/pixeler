import { Terrain } from '@objects/tiles/Terrain';
import { Rock } from '@objects/tiles/Rock';

import { Map, MapProps } from '@maps/base/Map';
import { Chest } from '@objects/Chest';

export class SimpleMap extends Map {
  protected width = 500;
  protected height = 500;

  protected start = { x: 40, y: this.height - 100 };

  constructor(props: MapProps) {
    super(props);

    this.setTiles([
      ...new Array(16).fill(null).map((_, i) => (
        new Terrain({
          width: 20,
          height: 10,
          x: this.width - 20 - i * 28,
          y: this.height - 30 - i * 10,
        })
      )),

      new Rock({ width: 30, height: 10, x: 180, y: this.height - 20 }),
      new Rock({ width: 25, height: 10, x: 200, y: this.height - 20 }),

      new Rock({ width: 30, height: 10, x: 340, y: this.height - 20 }),
      new Rock({ width: 25, height: 10, x: 320, y: this.height - 20 }),

      new Terrain({
        width: this.width / 2,
        height: 20,
        x: 0,
        y: this.height - 20,
        color: ['#b45333', '#83d34f'],
        onlyTopBorder: true,
      }),

      new Terrain({
        width: this.width / 2 - 20,
        height: 20,
        x: this.width / 2 + 20,
        y: this.height - 20,
        color: ['#b45333', '#83d34f'],
        onlyTopBorder: true,
      }),
    ]);

    this.setInteractions([
      new Chest({ inputs: props.inputs, x: 70, y: this.height - 35 }),
      new Chest({ inputs: props.inputs, x: 100, y: this.height - 35, open: true }),
      new Chest({ inputs: props.inputs, x: 130, y: this.height - 35, open: true, empty: true }),
    ]);
  }
}

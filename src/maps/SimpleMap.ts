import { Terrain } from '@objects/tiles/Terrain/Terrain';
import { Rock } from '@objects/decoration/Rock';

import { Map, MapProps } from '@maps/base/Map';
import { Chest } from '@objects/interaction/Chest';
import { Heart } from '@objects/interaction/Heart/Heart';
import { Options } from '@core/Options';
import { Platform } from '@objects/Platform';
import { Ground } from '@objects/tiles/Ground';

export class SimpleMap extends Map {
  protected width = 500;
  protected height = 260;

  protected start = { x: 40, y: this.height - 100 };

  constructor(props: MapProps) {
    super(props);

    this.setTiles((tilesProps) => [
      ...new Array(16).fill(null).map((_, i) => (
        new Terrain({
          width: 20,
          height: 10,
          x: this.width - 20 - i * 28,
          y: this.height - 30 - i * 10,
          ...tilesProps,
        })
      )),

      new Terrain({
        width: 20,
        height: 10,
        x: 30,
        y: this.height - 80,
        ...tilesProps,
      }),

      new Platform({
        tilesCount: [20, 3],
        x: 0,
        y: this.height - 30,
        tile: Ground,
        ...tilesProps,
      }),

      new Platform({
        tilesCount: [10, 4],
        x: 200,
        y: this.height - 40,
        tile: Ground,
        ...tilesProps,
      }),

      new Platform({
        tilesCount: [10, 5],
        x: 300,
        y: this.height - 50,
        tile: Ground,
        ...tilesProps,
      }),

      // new Terrain({
      //   width: this.width / 2,
      //   height: 20,
      //   x: 0,
      //   y: this.height - 20,
      //   color: ['#b45333', '#83d34f'],
      //   onlyTopBorder: true,
      //   ...tilesProps,
      // }),
      //
      // new Terrain({
      //   width: this.width / 2 - 20,
      //   height: 20,
      //   x: this.width / 2 + 20,
      //   y: this.height - 20,
      //   color: ['#b45333', '#83d34f'],
      //   onlyTopBorder: true,
      //   ...tilesProps,
      // }),
    ]);

    this.setInteractions((interactionProps) => [
      new Heart({ x: 202, y: this.height - 145, ...interactionProps }),

      new Chest({ x: 100, y: this.height - 45, ...interactionProps }),
      new Chest({ x: 130, y: this.height - 45, open: true, ...interactionProps }),
      new Chest({ x: 160, y: this.height - 45, open: true, empty: true, ...interactionProps }),
    ]);

    this.setDecoration((decorationProps) => [
      new Rock({ x: 210, y: this.height - 53, ...decorationProps }),

      new Rock({ x: 330, y: this.height - 63, ...decorationProps }),
    ]);
  }

  public drawBackground = () => {
    const { ctx } = Options.getCanvasOptions();
    const sizes = this.getSizes();

    const gradient = ctx.createLinearGradient(0, 0, 0, sizes.height);

    gradient.addColorStop(0, '#1e1b41');
    gradient.addColorStop(0.8, '#81c4ff');
    gradient.addColorStop(1, 'lightblue');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, sizes.width, sizes.height);
  };
}

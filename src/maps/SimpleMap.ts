import { Rock } from '@objects/decoration/Rock';

import { Map, MapProps } from '@maps/base/Map';
import { Chest } from '@objects/interaction/Chest';
import { Heart } from '@objects/interaction/Heart/Heart';
import { Options } from '@core/Options';
import { Platform } from '@objects/terrain/Platform';
import { Ground } from '@tiles/Ground';

export class SimpleMap extends Map {
  protected width = 500;
  protected height = 260;

  protected start = { x: 340, y: this.height - 100 };

  constructor(props: MapProps) {
    super(props);

    this.setTerrain((terrainProps) => [
      new Platform({
        tilesCount: [40, 3],
        x: 0,
        y: this.height - 30,
        tile: Ground,
        outerBorder: { left: false, right: false },
        innerBorder: { left: false, right: true },
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [8, 4],
        x: 420,
        y: this.height - 40,
        tile: Ground,
        outerBorder: { left: true, right: false },
        innerBorder: { left: true, right: false },
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [12, 4],
        x: 190,
        y: this.height - 70,
        tile: Ground,
        outerBorder: { left: false, right: true },
        innerBorder: { left: true, right: true },
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [8, 2],
        x: 190,
        y: this.height - 80,
        tile: Ground,
        outerBorder: { left: false, right: true },
        innerBorder: { left: true, right: true },
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [4, 2],
        x: 190,
        y: this.height - 90,
        tile: Ground,
        outerBorder: { left: true, right: true },
        innerBorder: { left: true, right: true },
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [20, 2],
        x: 200,
        y: this.height - 40,
        tile: Ground,
        outerBorder: { left: true, right: false },
        innerBorder: { left: true, right: true },
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [10, 2],
        x: 300,
        y: this.height - 50,
        tile: Ground,
        innerBorder: { left: true, right: true },
        ...terrainProps,
      }),
    ]);

    this.setInteractions((interactionProps) => [
      new Heart({ x: 203, y: this.height - 105, ...interactionProps }),

      new Chest({ x: 450, y: this.height - 55, ...interactionProps }),
    ]);

    this.setDecoration((decorationProps) => [
      new Rock({ x: 210, y: this.height - 53, ...decorationProps }),

      new Rock({ x: 475, y: this.height - 53, ...decorationProps }),
    ]);
  }

  public drawBackground = () => {
    const { ctx } = Options.getCanvasOptions();
    const sizes = this.getSizes();

    const gradient = ctx.createLinearGradient(0, 0, 0, sizes.height);

    gradient.addColorStop(0, '#1e1b41');
    gradient.addColorStop(1, '#1d6cab');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, sizes.width, sizes.height);
  };
}

import { Rock } from '@objects/decoration/Rock';

import { Map, MapProps } from '@maps/base/Map';
import { Chest } from '@objects/interaction/Chest';
import { Heart } from '@objects/interaction/Heart/Heart';
import { Options } from '@core/Options';
import { Platform } from '@objects/terrain/Platform';
import { Ground } from '@tiles/Ground';
import { Flower } from '@objects/decoration/Flower';
import { Grass } from '@objects/decoration/Grass/Grass';
import { Coin } from '@objects/interaction/Coin';
import { Boundary } from '@objects/types';
import { Torch } from '@objects/decoration/Torch';
import { Stairs } from '@objects/interaction/Stairs';

export class SimpleMap extends Map {
  protected width = 500;
  protected height = 260;

  protected start = { x: 320, y: this.height - 100 };

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
        boundary: [Boundary.top, Boundary.horizontal],
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [8, 4],
        x: 420,
        y: this.height - 40,
        tile: Ground,
        outerBorder: { left: true, right: false },
        innerBorder: { left: true, right: false },
        boundary: [Boundary.top, Boundary.horizontal],
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [14, 4],
        x: 170,
        y: this.height - 70,
        tile: Ground,
        outerBorder: { left: true, right: true },
        innerBorder: { left: true, right: true },
        boundary: [Boundary.top],
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [4, 1],
        x: 230,
        y: this.height - 80,
        tile: Ground,
        outerBorder: { left: false, right: true },
        boundary: [Boundary.top],
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [4, 5],
        x: 190,
        y: this.height - 120,
        tile: Ground,
        outerBorder: { left: true, right: true },
        innerBorder: { left: true, right: true },
        boundary: [Boundary.top],
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [20, 2],
        x: 200,
        y: this.height - 40,
        tile: Ground,
        outerBorder: { left: true, right: false },
        innerBorder: { left: true, right: true },
        boundary: [Boundary.top, Boundary.horizontal],
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [10, 2],
        x: 300,
        y: this.height - 50,
        tile: Ground,
        innerBorder: { left: true, right: true },
        boundary: [Boundary.top, Boundary.horizontal],
        ...terrainProps,
      }),
    ]);

    this.setInteractions((interactionProps) => [
      new Heart({ x: 205, y: this.height - 132, ...interactionProps }),

      new Coin({ x: 90, y: this.height - 40, ...interactionProps }),
      new Coin({ x: 110, y: this.height - 40, ...interactionProps }),
      new Coin({ x: 130, y: this.height - 40, ...interactionProps }),
      new Coin({ x: 150, y: this.height - 40, ...interactionProps }),
      new Coin({ x: 170, y: this.height - 40, ...interactionProps }),

      new Coin({ x: 235, y: this.height - 90, ...interactionProps }),
      new Coin({ x: 255, y: this.height - 90, ...interactionProps }),

      new Coin({ x: 275, y: this.height - 80, ...interactionProps }),
      new Coin({ x: 295, y: this.height - 80, ...interactionProps }),

      new Chest({ x: 450, y: this.height - 60, ...interactionProps }),

      new Stairs({ x: 195, y: this.height - 120, count: 5, ...interactionProps }),
    ]);

    this.setDecoration((decorationProps) => [
      new Torch({ x: 215, y: this.height - 95, ...decorationProps }),

      new Grass({ x: 0, y: this.height - 36, count: 12, ...decorationProps }),

      new Rock({ x: 115, y: this.height - 40, ...decorationProps }),

      new Flower({ x: 129, y: this.height - 36, type: 0, ...decorationProps }),

      new Grass({ x: 140, y: this.height - 36, count: 6, ...decorationProps }),

      new Grass({ x: 220, y: this.height - 46, count: 7, ...decorationProps }),

      new Grass({ x: 430, y: this.height - 46, count: 2, ...decorationProps }),

      new Grass({ x: 240, y: this.height - 86, count: 2, ...decorationProps }),

      new Grass({ x: 330, y: this.height - 56, count: 4, ...decorationProps }),

      new Grass({ x: 270, y: this.height - 76, count: 2, ...decorationProps }),

      new Flower({ x: 206, y: this.height - 46, type: 2, ...decorationProps }),

      new Rock({ x: 228, y: this.height - 50, ...decorationProps }),

      new Flower({ x: 315, y: this.height - 56, type: 1, ...decorationProps }),

      new Flower({ x: 380, y: this.height - 56, type: 0, ...decorationProps }),

      new Flower({ x: 420, y: this.height - 46, type: 2, ...decorationProps }),

      new Rock({ x: 475, y: this.height - 50, ...decorationProps }),
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

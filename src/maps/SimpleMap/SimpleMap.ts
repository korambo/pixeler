import { Rock } from '@objects/decoration/Rock';

import { Map, MapProps } from '@maps/base/Map';
import { Chest } from '@objects/interaction/Chest';
import { Heart } from '@objects/interaction/Heart';
import { Platform } from '@objects/terrain/Platform';
import { Ground } from '@tiles/Ground';
import { Flower } from '@objects/decoration/Flower';
import { Grass } from '@objects/decoration/Grass';
import { Coin } from '@objects/interaction/Coin';
import { Torch } from '@objects/decoration/Torch';
import { Stairs } from '@objects/interaction/Stairs';
import { Bonfire } from '@objects/decoration/Bonfire';
import { Bush } from '@objects/decoration/Bush';
import { Orc } from '@objects/enemy/Orc';
import { Orientation } from '@objects/types';
import { Cloud } from '@objects/decoration/Cloud/Cloud';
import { Draw } from '@core/Draw';

export class SimpleMap extends Map {
  protected width = 500;
  protected height = 180;

  protected start = { x: 60, y: this.height - 60 };

  public constructor(props: MapProps) {
    super(props);

    // TODO
    this.player.setOriginalCoordinates(this.getStart());

    this.setTerrain((terrainProps) => [
      new Platform({
        tilesCount: [40, 3],
        x: 0,
        y: this.height - 30,
        tile: Ground,
        border: { left: false },
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [8, 4],
        x: 420,
        y: this.height - 40,
        tile: Ground,
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [10, 2],
        x: 50,
        y: this.height - 130,
        tile: Ground,
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [14, 2],
        x: 170,
        y: this.height - 110,
        tile: Ground,
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [18, 2],
        x: 220,
        y: this.height - 40,
        tile: Ground,
        border: { bottom: false },
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [10, 2],
        x: 300,
        y: this.height - 50,
        tile: Ground,
        border: { bottom: false },
        ...terrainProps,
      }),
    ]);

    this.setInteractions((interactionProps) => [
      new Chest({ x: 60, y: this.height - 150, ...interactionProps }),

      new Coin({ x: 90, y: this.height - 40, ...interactionProps }),
      new Coin({ x: 110, y: this.height - 40, ...interactionProps }),
      new Coin({ x: 130, y: this.height - 40, ...interactionProps }),
      new Coin({ x: 150, y: this.height - 40, ...interactionProps }),
      new Coin({ x: 170, y: this.height - 40, ...interactionProps }),

      new Stairs({ x: 200, y: this.height - 110, count: 6, ...interactionProps }),

      new Coin({ x: 215, y: this.height - 120, ...interactionProps }),
      new Coin({ x: 235, y: this.height - 120, ...interactionProps }),
      new Coin({ x: 255, y: this.height - 120, ...interactionProps }),
      new Coin({ x: 275, y: this.height - 120, ...interactionProps }),
      new Heart({ x: 295, y: this.height - 125, ...interactionProps }),

      new Chest({ x: 450, y: this.height - 60, ...interactionProps }),
    ]);

    this.setDecoration((decorationProps) => [
      new Cloud({ x: 10, y: 20, type: 0, ...decorationProps }),
      new Cloud({ x: 45, y: 5, type: 2, ...decorationProps }),

      new Cloud({ x: 150, y: 10, type: 1, ...decorationProps }),
      new Cloud({ x: 200, y: 5, type: 2, ...decorationProps }),

      new Torch({ x: 215, y: this.height - 105, ...decorationProps }),

      new Bush({ x: 170, y: this.height - 122, ...decorationProps }),

      new Bonfire({ x: 15, y: this.height - 54, ...decorationProps }),

      new Grass({ x: 80, y: this.height - 36, count: 4, ...decorationProps }),

      new Rock({ x: 115, y: this.height - 40, ...decorationProps }),

      new Flower({ x: 129, y: this.height - 36, type: 0, ...decorationProps }),

      new Grass({ x: 140, y: this.height - 36, count: 6, ...decorationProps }),

      new Grass({ x: 220, y: this.height - 46, count: 8, ...decorationProps }),

      new Grass({ x: 430, y: this.height - 46, count: 2, ...decorationProps }),

      new Grass({ x: 240, y: this.height - 116, count: 2, ...decorationProps }),

      new Grass({ x: 330, y: this.height - 56, count: 4, ...decorationProps }),

      new Grass({ x: 270, y: this.height - 116, count: 2, ...decorationProps }),

      new Flower({ x: 206, y: this.height - 36, type: 2, ...decorationProps }),

      new Rock({ x: 228, y: this.height - 50, ...decorationProps }),

      new Flower({ x: 315, y: this.height - 56, type: 1, ...decorationProps }),

      new Flower({ x: 380, y: this.height - 56, type: 0, ...decorationProps }),

      new Flower({ x: 420, y: this.height - 46, type: 2, ...decorationProps }),

      new Rock({ x: 475, y: this.height - 50, ...decorationProps }),
    ]);

    this.setEnemies((enemyProps) => [
      new Orc({ x: 190, y: this.height - 160, state: { aiAction: { watch: 80 } }, ...enemyProps }),

      new Orc({ x: 250, y: this.height - 60, state: { orientation: Orientation.left }, ...enemyProps }),

      new Orc({ x: 280, y: this.height - 60, state: { orientation: Orientation.left }, ...enemyProps }),

      new Orc({ x: 100, y: this.height - 150, state: { orientation: Orientation.right }, ...enemyProps }),
    ]);
  }

  public drawBackground = () => {
    const img = this.assetsLoader.getImage('simple_map_background');

    Draw.drawImage(img, { x: 0, y: 0 }, this.getSizes());
  };
}

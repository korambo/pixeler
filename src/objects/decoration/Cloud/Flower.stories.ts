import { Meta } from '@storybook/html';
import { Game } from '@core/Game';
import { Map, MapProps } from '@maps/base/Map';
import { Options } from '@core/Options';
import { Platform } from '@objects/terrain/Platform';
import { Ground } from '@tiles/Ground';
import { Flower } from '@objects/decoration/Flower';

class FlowerMap extends Map {
  protected width = 320;
  protected height = 180;

  protected start = { x: 20, y: this.height - 60 };

  public constructor(props: MapProps) {
    super(props);

    this.setTerrain((terrainProps) => [
      new Platform({
        tilesCount: [32, 3],
        x: 0,
        y: this.height - 30,
        tile: Ground,
        ...terrainProps,
      }),
    ]);

    this.setDecoration((decorationProps) => [
      new Flower({ x: 90, y: this.height - 36, type: 0, ...decorationProps }),
      new Flower({ x: 105, y: this.height - 36, type: 0, ...decorationProps }),

      new Flower({ x: 120, y: this.height - 36, type: 1, ...decorationProps }),
      new Flower({ x: 135, y: this.height - 36, type: 1, ...decorationProps }),

      new Flower({ x: 150, y: this.height - 36, type: 2, ...decorationProps }),
      new Flower({ x: 165, y: this.height - 36, type: 2, ...decorationProps }),

      // random type
      new Flower({ x: 190, y: this.height - 36, ...decorationProps }),
      new Flower({ x: 205, y: this.height - 36, ...decorationProps }),
      new Flower({ x: 220, y: this.height - 36, ...decorationProps }),
    ]);
  }
}

export default {
  title: 'Decoration/Flower',
} as Meta;

export const States = () => {
  Options.init({ canvasId: 'game' });

  const game = new Game({ customMap: FlowerMap });
  game.draw();

  return '';
};

import { Meta } from '@storybook/html';
import { Game } from '@core/Game';
import { Map, MapProps } from '@maps/base/Map';
import { Options } from '@core/Options';
import { Platform } from '@objects/terrain/Platform';
import { Ground } from '@tiles/Ground';
import { Grass } from '@objects/decoration/Grass';

class RockMap extends Map {
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
      new Grass({ x: 130, y: this.height - 40, ...decorationProps }),
      new Grass({ x: 150, y: this.height - 40, count: 4, ...decorationProps }),
    ]);
  }
}

export default {
  title: 'Decoration/Grass',
} as Meta;

export const States = () => {
  Options.init({ canvasId: 'game' });

  const game = new Game({ customMap: RockMap });
  game.draw();

  return '';
};

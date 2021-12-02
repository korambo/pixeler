import { Meta } from '@storybook/html';
import { Game } from '@core/Game';
import { Map, MapProps } from '@maps/base/Map';
import { Options } from '@core/Options';
import { Orc } from '@objects/enemy/Orc';
import { Platform } from '@objects/terrain/Platform';
import { Ground } from '@tiles/Ground';
import { Orientation } from '@objects/types';

class OrcMap extends Map {
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

    this.setEnemies((enemyProps) => [
      new Orc({ x: 100, y: this.height - 42, state: {}, ...enemyProps }),
      new Orc({ x: 130, y: this.height - 42, state: { orientation: Orientation.right }, ...enemyProps }),
      new Orc({ x: 160, y: this.height - 42, state: { aiAction: { watch: 50 } }, ...enemyProps }),
    ]);
  }
}

export default {
  title: 'Enemy/Orc',
} as Meta;

export const States = () => {
  Options.init({ canvasId: 'game' });

  const game = new Game({ customMap: OrcMap });
  game.draw();

  return '';
};

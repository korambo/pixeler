import { Meta } from '@storybook/html';
import { Game } from '@core/Game';
import { Map, MapProps } from '@maps/base/Map';
import { Options } from '@core/Options';
import { Coin } from '@objects/interaction/Coin';
import { Platform } from '@objects/terrain/Platform';
import { Ground } from '@tiles/Ground';

class CoinMap extends Map {
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

    this.setInteractions((interactionProps) => [
      new Coin({ x: 135, y: this.height - 40, ...interactionProps }),
      new Coin({ x: 150, y: this.height - 40, ...interactionProps }),
      new Coin({ x: 165, y: this.height - 40, ...interactionProps }),
    ]);
  }
}

export default {
  title: 'Interaction/Coin',
} as Meta;

export const States = () => {
  Options.init({ canvasId: 'game' });

  const game = new Game({ customMap: CoinMap });
  game.draw();

  return '';
};

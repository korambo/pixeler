import { Meta } from '@storybook/html';
import { Game } from '@core/Game';
import { Map, MapProps } from '@maps/base/Map';
import { Chest } from '@objects/interaction/Chest/Chest';
import { Options } from '@core/Options';
import { Platform } from '@objects/terrain/Platform';
import { Ground } from '@tiles/Ground';

class ChestMap extends Map {
  protected width = 320;
  protected height = 180;

  protected start = { x: 20, y: this.height - 60 };

  constructor(props: MapProps) {
    super(props);

    this.setTerrain((terrainProps) => [
      new Platform({
        tilesCount: [32, 3],
        x: 0,
        y: this.height - 30,
        tile: Ground,
        outerBorder: { left: false, right: false },
        ...terrainProps,
      }),
    ]);

    this.setInteractions((interactionProps) => [
      new Chest({ x: 100, y: this.height - 45, ...interactionProps }),
      new Chest({ x: 140, y: this.height - 45, empty: true, ...interactionProps }),
      new Chest({ x: 180, y: this.height - 45, open: true, ...interactionProps }),
      new Chest({ x: 220, y: this.height - 45, open: true, empty: true, ...interactionProps }),
    ]);
  }
}

export default {
  title: 'Interaction/Chest',
} as Meta;

export const States = () => {
  Options.init('game');

  const game = new Game({ customMap: ChestMap });
  game.draw();

  return '';
};

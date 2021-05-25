import { Meta } from '@storybook/html';
import { Game } from '@core/Game';
import { Map, MapProps } from '@maps/base/Map';
import { Options } from '@core/Options';
import { Stairs } from '@objects/interaction/Stairs';
import { Platform } from '@objects/terrain/Platform';
import { Ground } from '@tiles/Ground';

class StairsMap extends Map {
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
        outerBorder: { left: false, right: false },
        ...terrainProps,
      }),
    ]);

    this.setInteractions((interactionProps) => [
      new Stairs({ x: 105, y: this.height - 80, count: 5, ...interactionProps }),
      new Stairs({ x: 150, y: this.height - 70, count: 4, ...interactionProps }),
      new Stairs({ x: 195, y: this.height - 60, count: 3, ...interactionProps }),
    ]);
  }
}

export default {
  title: 'Interaction/Stairs',
} as Meta;

export const States = () => {
  Options.init('game');

  const game = new Game({ customMap: StairsMap });
  game.draw();

  return '';
};

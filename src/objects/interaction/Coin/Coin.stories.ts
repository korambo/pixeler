import { Meta } from '@storybook/html';
import { Game } from '@core/Game';
import { Map, MapProps } from '@maps/base/Map';
import { Options } from '@core/Options';
import { Heart } from '@objects/interaction/Heart/Heart';
import { Platform } from '@objects/terrain/Platform';
import { Ground } from '@tiles/Ground';

class HeartMap extends Map {
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
      new Heart({ x: 150, y: this.height - 45, ...interactionProps }),
    ]);
  }
}

export default {
  title: 'Interaction/Heart',
} as Meta;

export const States = () => {
  Options.init('game');

  const game = new Game({ customMap: HeartMap });
  game.draw();

  return '';
};

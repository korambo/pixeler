import { Meta } from '@storybook/html';
import { Game } from '@core/Game';
import { Map, MapProps } from '@maps/base/Map';
import { Terrain } from '@objects/tiles/Terrain/Terrain';
import { Options } from '@core/Options';
import { Heart } from '@objects/interaction/Heart/Heart';

class HeartMap extends Map {
  protected width = 320;
  protected height = 180;

  protected start = { x: 20, y: 50 };

  constructor(props: MapProps) {
    super(props);

    this.setTiles((tilesProps) => [
      new Terrain({
        width: 200, height: 20, x: 0, y: 140, color: ['#b45333', '#83d34f'], onlyTopBorder: true, ...tilesProps,
      }),
    ]);

    this.setInteractions((interactionProps) => [
      new Heart({ x: 60, y: 125, ...interactionProps }),
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

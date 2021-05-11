import { Meta } from '@storybook/html';
import { Game } from '@core/Game';
import { Map, MapProps } from '@maps/base/Map';
import { Terrain } from '@objects/tiles/Terrain';
import { Chest } from '@objects/Chest/Chest';
import { Options } from '@core/Options';

class ChestMap extends Map {
  protected width = 200;
  protected height = 150;

  protected start = { x: 20, y: 50 };

  constructor(props: MapProps) {
    super(props);

    this.setTiles([
      new Terrain({
        width: 200, height: 20, x: 0, y: 140, color: ['#b45333', '#83d34f'], onlyTopBorder: true,
      }),
    ]);

    this.setInteractions([
      new Chest({ inputs: props.inputs, x: 60, y: 125 }),
      new Chest({ inputs: props.inputs, x: 90, y: 125, empty: true }),
      new Chest({ inputs: props.inputs, x: 120, y: 125, open: true }),
      new Chest({ inputs: props.inputs, x: 150, y: 125, open: true, empty: true }),
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

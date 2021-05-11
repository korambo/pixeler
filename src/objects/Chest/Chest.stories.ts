import { Meta, Story } from '@storybook/html';
import { Game } from '@core/Game';
import { Map, MapProps } from '@maps/base/Map';
import { Terrain } from '@objects/tiles/Terrain';
import { Chest } from '@objects/Chest/Chest';

class ChestMap extends Map {
  width = 200;
  height = 150;
  start = { x: 20, y: 50 };

  constructor(props: MapProps) {
    super(props);

    this.setTiles([
      new Terrain({ width: 200, height: 20, x: 0, y: 140, color: ['#b45333', '#83d34f'], onlyTopBorder: true }),
    ]);

    this.setInteractions([
      new Chest({ inputs: props.inputs, x: 60, y: 125 }),
      new Chest({ inputs: props.inputs, x: 90, y: 125, open: true }),
      new Chest({ inputs: props.inputs, x: 120, y: 125, open: true, empty: true }),
    ]);
  }
}

export default {
  title: 'Interaction/Chest',
} as Meta;

export const States =  (args) => {
  const game = new Game({ canvasId: 'game', customMap: ChestMap });
  game.draw();

  return '';
};
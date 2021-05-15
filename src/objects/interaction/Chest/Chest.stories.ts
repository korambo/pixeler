import { Meta } from '@storybook/html';
import { Game } from '@core/Game';
import { Map, MapProps } from '@maps/base/Map';
import { Terrain } from '@objects/tiles/Terrain';
import { Chest } from '@objects/interaction/Chest/Chest';
import { Options } from '@core/Options';

class ChestMap extends Map {
  protected width = 200;
  protected height = 150;

  protected start = { x: 20, y: 50 };
  protected startCamera = { x: 0, y: 0 };

  constructor(props: MapProps) {
    super(props);

    const tilesProps = {
      imageLoader: props.imageLoader,
    };

    const interactionProps = {
      inputs: props.inputs,
      imageLoader: props.imageLoader,
    };

    this.setTiles([
      new Terrain({
        width: 200, height: 20, x: 0, y: 140, color: ['#b45333', '#83d34f'], onlyTopBorder: true, ...tilesProps,
      }),
    ]);

    this.setInteractions([
      new Chest({ x: 60, y: 125, ...interactionProps }),
      new Chest({ x: 90, y: 125, empty: true, ...interactionProps }),
      new Chest({ x: 120, y: 125, open: true, ...interactionProps }),
      new Chest({ x: 150, y: 125, open: true, empty: true, ...interactionProps }),
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

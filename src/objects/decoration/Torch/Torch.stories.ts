import { Meta } from '@storybook/html';
import { Game } from '@core/Game';
import { Map, MapProps } from '@maps/base/Map';
import { Options } from '@core/Options';
import { Platform } from '@objects/terrain/Platform';
import { Ground } from '@tiles/Ground';
import { Torch } from '@objects/decoration/Torch';

class TorchMap extends Map {
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

    this.setDecoration((decorationProps) => [
      new Torch({ x: 150, y: this.height - 42, ...decorationProps }),
    ]);
  }
}

export default {
  title: 'Decoration/Torch',
} as Meta;

export const States = () => {
  Options.init('game');

  const game = new Game({ customMap: TorchMap });
  game.draw();

  return '';
};

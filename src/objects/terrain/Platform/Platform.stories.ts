import { Meta } from '@storybook/html';
import { Game } from '@core/Game';
import { Map, MapProps } from '@maps/base/Map';
import { Options } from '@core/Options';
import { Platform } from '@objects/terrain/Platform';
import { Ground as GroundTile } from '@tiles/Ground';

class PlatformMap extends Map {
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
        tile: GroundTile,
        outerBorder: { left: false, right: false },
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [1, 1],
        x: 30,
        y: 30,
        tile: GroundTile,
        outerBorder: { left: false, right: false },
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [1, 1],
        x: 30,
        y: 50,
        tile: GroundTile,
        outerBorder: { left: false, right: false },
        onlyInner: true,
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [2, 1],
        x: 50,
        y: 50,
        tile: GroundTile,
        outerBorder: { left: false, right: false },
        onlyInner: true,
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [2, 1],
        x: 50,
        y: 30,
        tile: GroundTile,
        outerBorder: { left: false, right: false },
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [3, 2],
        x: 80,
        y: 30,
        tile: GroundTile,
        outerBorder: { left: false, right: false },
        innerBorder: { left: false, right: false },
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [3, 2],
        x: 80,
        y: 80,
        tile: GroundTile,
        innerBorder: { left: true, right: false },
        onlyInner: true,
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [3, 2],
        x: 120,
        y: 80,
        tile: GroundTile,
        innerBorder: { left: false, right: false },
        onlyInner: true,
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [3, 2],
        x: 160,
        y: 80,
        tile: GroundTile,
        innerBorder: { left: false, right: true },
        onlyInner: true,
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [3, 2],
        x: 80,
        y: 60,
        tile: GroundTile,
        outerBorder: { left: true, right: true },
        innerBorder: { left: true, right: true },
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [3, 2],
        x: 120,
        y: 30,
        tile: GroundTile,
        outerBorder: { left: true, right: false },
        innerBorder: { left: true, right: false },
        ...terrainProps,
      }),
      new Platform({
        tilesCount: [3, 2],
        x: 120,
        y: 60,
        tile: GroundTile,
        outerBorder: { left: false, right: true },
        innerBorder: { left: false, right: true },
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [3, 2],
        x: 160,
        y: 30,
        tile: GroundTile,
        outerBorder: { left: false, right: true },
        innerBorder: { left: true, right: false },
        ...terrainProps,
      }),
      new Platform({
        tilesCount: [3, 2],
        x: 160,
        y: 60,
        tile: GroundTile,
        outerBorder: { left: true, right: false },
        innerBorder: { left: false, right: true },
        ...terrainProps,
      }),
      new Platform({
        tilesCount: [4, 4],
        x: 200,
        y: 30,
        tile: GroundTile,
        outerBorder: { left: false, right: false },
        innerBorder: { left: false, right: false },
        ...terrainProps,
      }),
      new Platform({
        tilesCount: [4, 4],
        x: 250,
        y: 30,
        tile: GroundTile,
        outerBorder: { left: true, right: true },
        innerBorder: { left: true, right: true },
        ...terrainProps,
      }),
      new Platform({
        tilesCount: [4, 4],
        x: 200,
        y: 70,
        tile: GroundTile,
        innerBorder: { left: false, right: false },
        onlyInner: true,
        ...terrainProps,
      }),
      new Platform({
        tilesCount: [4, 4],
        x: 250,
        y: 70,
        tile: GroundTile,
        innerBorder: { left: true, right: true },
        onlyInner: true,
        ...terrainProps,
      }),
    ]);
  }
}

export default {
  title: 'Terrain/Platform',
} as Meta;

export const Ground = () => {
  Options.init('game');

  const game = new Game({ customMap: PlatformMap });
  game.draw();

  return '';
};

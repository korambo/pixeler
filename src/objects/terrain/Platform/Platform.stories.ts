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
      // main

      new Platform({
        tilesCount: [32, 3],
        x: 0,
        y: this.height - 30,
        tile: GroundTile,
        ...terrainProps,
      }),

      // single

      new Platform({
        tilesCount: [1, 1],
        x: 10,
        y: 10,
        tile: GroundTile,
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [1, 1],
        x: 10,
        y: 30,
        tile: GroundTile,
        onlyInner: true,
        ...terrainProps,
      }),

      // horizontal

      new Platform({
        tilesCount: [2, 1],
        x: 30,
        y: 10,
        tile: GroundTile,
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [2, 1],
        x: 30,
        y: 30,
        tile: GroundTile,
        onlyInner: true,
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [3, 1],
        x: 60,
        y: 10,
        tile: GroundTile,
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [3, 1],
        x: 60,
        y: 30,
        tile: GroundTile,
        onlyInner: true,
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [4, 1],
        x: 100,
        y: 10,
        tile: GroundTile,
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [4, 1],
        x: 100,
        y: 30,
        tile: GroundTile,
        onlyInner: true,
        ...terrainProps,
      }),

      // vertical

      new Platform({
        tilesCount: [1, 2],
        x: 30,
        y: 50,
        tile: GroundTile,
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [1, 2],
        x: 50,
        y: 50,
        tile: GroundTile,
        onlyInner: true,
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [1, 3],
        x: 70,
        y: 50,
        tile: GroundTile,
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [1, 3],
        x: 90,
        y: 50,
        tile: GroundTile,
        onlyInner: true,
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [1, 4],
        x: 110,
        y: 50,
        tile: GroundTile,
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [1, 4],
        x: 130,
        y: 50,
        tile: GroundTile,
        onlyInner: true,
        ...terrainProps,
      }),

      // squire

      new Platform({
        tilesCount: [2, 2],
        x: 150,
        y: 10,
        tile: GroundTile,
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [2, 2],
        x: 150,
        y: 40,
        tile: GroundTile,
        onlyInner: true,
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [3, 3],
        x: 180,
        y: 10,
        tile: GroundTile,
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [3, 3],
        x: 180,
        y: 50,
        tile: GroundTile,
        onlyInner: true,
        ...terrainProps,
      }),

      // rectangle

      new Platform({
        tilesCount: [4, 6],
        x: 220,
        y: 10,
        tile: GroundTile,
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [4, 6],
        x: 220,
        y: 80,
        tile: GroundTile,
        onlyInner: true,
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [4, 2],
        x: 270,
        y: 10,
        tile: GroundTile,
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [4, 2],
        x: 270,
        y: 40,
        tile: GroundTile,
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
  Options.init({ canvasId: 'game' });

  const game = new Game({ customMap: PlatformMap });
  game.draw();

  return '';
};

import { Map, MapProps } from '@maps/base/Map';
import { Options } from '@core/Options';
import { Platform } from '@objects/terrain/Platform';
import { Ground } from '@tiles/Ground';

// import { Boundary } from '@objects/types';

export class PhysicTest extends Map {
  protected width = 500;
  protected height = 260;

  protected start = { x: 100, y: this.height - 60 };

  public constructor(props: MapProps) {
    super(props);

    this.setTerrain((terrainProps) => [
      new Platform({
        tilesCount: [40, 3],
        x: 0,
        y: this.height - 30,
        tile: Ground,
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [1, 6],
        x: 80,
        y: this.height - 90,
        tile: Ground,
        ...terrainProps,
      }),

      new Platform({
        tilesCount: [1, 2],
        x: 140,
        y: this.height - 50,
        tile: Ground,
        ...terrainProps,
      }),
    ]);
  }

  public drawBackground = () => {
    const { ctx } = Options.getCanvasOptions();
    const sizes = this.getSizes();

    const gradient = ctx.createLinearGradient(0, 0, 0, sizes.height);

    gradient.addColorStop(0, '#1e1b41');
    gradient.addColorStop(1, '#1d6cab');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, sizes.width, sizes.height);
  };
}

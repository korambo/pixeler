import { Map, MapProps } from '@maps/base/Map';
import { Options } from '@core/Options';
import { Platform } from '@objects/terrain/Platform';
import { Ground } from '@tiles/Ground';

export class PhysicTest extends Map {
  protected width = 500;
  protected height = 260;

  protected start = { x: 80, y: this.height - 120 };

  public constructor(props: MapProps) {
    super(props);

    this.setTerrain((terrainProps) => [
      new Platform({
        tilesCount: [10, 1],
        x: 50,
        y: this.height - 80,
        tile: Ground,
        outerBorder: { left: false, right: false },
        innerBorder: { left: false, right: false },
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

import { Terrain } from '@objects/tiles/Terrain';
import { Rock } from '@objects/decoration/Rock';

import { Map, MapProps } from '@maps/base/Map';
import { Chest } from '@objects/interaction/Chest';
import { Heart } from '@objects/interaction/Heart/Heart';
import { Options } from '@core/Options';

export class SimpleMap extends Map {
  protected width = 500;
  protected height = 260;

  protected start = { x: 40, y: this.height - 100 };

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
      ...new Array(16).fill(null).map((_, i) => (
        new Terrain({
          width: 20,
          height: 10,
          x: this.width - 20 - i * 28,
          y: this.height - 30 - i * 10,
          ...tilesProps,
        })
      )),

      new Rock({ x: 200, y: this.height - 33, ...tilesProps }),

      new Rock({ x: 320, y: this.height - 33, ...tilesProps }),

      new Terrain({
        width: this.width / 2,
        height: 20,
        x: 0,
        y: this.height - 20,
        color: ['#b45333', '#83d34f'],
        onlyTopBorder: true,
        ...tilesProps,
      }),

      new Terrain({
        width: this.width / 2 - 20,
        height: 20,
        x: this.width / 2 + 20,
        y: this.height - 20,
        color: ['#b45333', '#83d34f'],
        onlyTopBorder: true,
        ...tilesProps,
      }),
    ]);

    this.setInteractions([
      new Heart({ x: 202, y: this.height - 145, ...interactionProps }),

      new Chest({ x: 70, y: this.height - 35, ...interactionProps }),
      new Chest({ x: 100, y: this.height - 35, open: true, ...interactionProps }),
      new Chest({ x: 130, y: this.height - 35, open: true, empty: true, ...interactionProps }),
    ]);
  }

  public drawBackground = () => {
    const { ctx } = Options.getCanvasOptions();
    const sizes = this.getSizes();

    const gradient = ctx.createLinearGradient(0, 0, 0, sizes.height);

    gradient.addColorStop(0, '#1e1b41');
    gradient.addColorStop(0.8, '#81c4ff');
    gradient.addColorStop(1, 'lightblue');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, sizes.width, sizes.height);
  };
}

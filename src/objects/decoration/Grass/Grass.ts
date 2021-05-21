import { Draw } from '@core/Draw';
import { Decoration, DecorationProps } from '@objects/base/Decoration';
import { Options } from '@core/Options';

interface GrassProps extends DecorationProps {
  count?: number;
}

export class Grass extends Decoration {
  width = 10;
  height = 10;

  private pattern: CanvasPattern;
  private readonly count: number;

  constructor(props: GrassProps) {
    super(props);

    this.count = props.count || 1;
  }

  private setPattern = () => {
    const img = this.imageLoader.getImage('grass.png');
    this.pattern = Draw.getPattern(img, { width: this.width, height: this.height });
  };

  public draw() {
    const { ctx } = Options.getCanvasOptions();
    const sizes = this.getSizes();
    const coordinates = this.getCoordinates();

    if (!this.pattern) {
      this.setPattern();
    }

    ctx.beginPath();
    ctx.fillStyle = this.pattern;
    ctx.fillRect(coordinates.x, coordinates.y, sizes.width * this.count, sizes.height);
    ctx.fill();
  }
}

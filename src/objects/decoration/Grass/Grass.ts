import { Draw } from '@core/Draw';
import { Decoration, DecorationProps } from '@objects/base/Decoration';
import { Options } from '@core/Options';

interface GrassProps extends DecorationProps {
  count?: number;
}

export class Grass extends Decoration {
  protected width = 10;
  protected height = 10;

  private pattern: CanvasPattern;
  private readonly count: number;

  public constructor(props: GrassProps) {
    super(props);

    this.count = props.count || 1;
  }

  public init() {
    const img = this.assetsLoader.getImage('grass');
    this.pattern = Draw.getPattern(img, { width: this.width, height: this.height });
  }

  public draw() {
    const { ctx } = Options.getCanvasOptions();
    const sizes = this.getSizes();
    const coordinates = this.getCoordinates();

    ctx.beginPath();
    ctx.fillStyle = this.pattern;
    ctx.fillRect(coordinates.x, coordinates.y, sizes.width * this.count, sizes.height);
    ctx.fill();
  }
}

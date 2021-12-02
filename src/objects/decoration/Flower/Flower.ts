import { Decoration, DecorationProps } from '@objects/base/Decoration';
import { Sprite } from '@core/Assets/Sprite';

interface FlowerProps extends DecorationProps {
  type?: 0|1|2;
}

export class Flower extends Decoration {
  protected width = 10;
  protected height = 6;

  private readonly type: number;

  public constructor(props: FlowerProps) {
    super(props);

    this.type = typeof props.type !== 'number' ? Math.floor(Math.random() * 2) : props.type;
  }

  public init() {
    const frameSize = { width: this.width, height: this.height };

    this.sprite = {
      base: new Sprite({
        image: this.assetsLoader.getImage('flower_sprite'),
        frameSize,
      }),
    };
  }

  public draw() {
    const { base } = this.sprite;
    const coordinates = this.getCoordinates();

    base.drawFrame([0, this.type], coordinates);
  }
}

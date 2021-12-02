import { Decoration, DecorationProps } from '@objects/base/Decoration';
import { Sprite } from '@core/Assets/Sprite';

interface CloudProps extends DecorationProps {
  type?: 0|1|2;
}

export class Cloud extends Decoration {
  protected width = 32;
  protected height = 32;

  private readonly type: number;

  public constructor(props: CloudProps) {
    super(props);

    this.type = typeof props.type !== 'number' ? Math.floor(Math.random() * 2) : props.type;
  }

  public init() {
    const frameSize = { width: this.width, height: this.height };

    this.sprite = {
      base: new Sprite({
        image: this.assetsLoader.getImage('cloud_sprite'),
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

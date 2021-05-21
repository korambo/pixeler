import { Decoration, DecorationProps } from '@objects/base/Decoration';
import { Sprite } from '@core/Sprite';

interface FlowerProps extends DecorationProps {
  type?: 0|1|2;
}

export class Flower extends Decoration {
  width = 10;
  height = 6;

  sprite: Sprite;

  private readonly type: number;

  constructor(props: FlowerProps) {
    super(props);

    this.type = typeof props.type !== 'number' ? Math.floor(Math.random() * 2) : props.type;
  }

  private initSprite = () => {
    const frameSize = { width: this.width, height: this.height };

    this.sprite = new Sprite({
      image: this.imageLoader.getImage('flower_sprite.png'),
      frameSize,
    });
  };

  public draw() {
    const coordinates = this.getCoordinates();

    if (!this.sprite) {
      this.initSprite();
    }

    this.sprite.drawFrame([0, this.type], coordinates);
  }
}

import { Draw } from '@core/Draw';
import { Decoration, DecorationProps } from '@objects/base/Decoration';

interface FlowerProps extends DecorationProps {
  type?: 1|2|3;
}

export class Flower extends Decoration {
  width = 10;
  height = 6;

  private readonly type: number;

  constructor(props: FlowerProps) {
    super(props);

    this.type = props.type || Math.floor(Math.random() * 3) + 1;
  }

  public draw() {
    const coordinates = this.getCoordinates();
    const img = this.imageLoader.getImage(`flower_${this.type}.png`);

    Draw.drawImage(img, coordinates, { width: this.width, height: this.height });
  }
}

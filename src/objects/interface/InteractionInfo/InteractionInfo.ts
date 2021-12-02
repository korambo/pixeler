import { Interface, InterfaceProps } from '@objects/base/Interface';
import { Text } from '@objects/interface/Text';
import { Draw } from '@core/Draw';
import { Rectangle } from '@geometry/Rectangle';
import { TSizes } from '@core/types';

export interface InteractionInfoProps extends InterfaceProps, TSizes {}

export class InteractionInfo extends Interface {
  protected width = 18;
  protected height = 12;

  private text: Text;
  private plate: Draw;

  public constructor(props: InteractionInfoProps) {
    super(props);

    const coordinates = this.getCoordinates();
    const sizes = this.getSizes();

    this.text = new Text({
      x: this.x + this.width / 2 - 2,
      y: this.y - 13,
      assetsLoader: this.assetsLoader,

      message: 'f',
      color: '#fff',
    });

    this.plate = new Draw({
      ...coordinates,
      ...sizes,

      elements: [
        new Rectangle({
          width: sizes.width,
          height: sizes.height,
          x: coordinates.x,
          y: Draw.removePixels(coordinates.y, 16),
          color: '#b75d2a',
          filled: true,
        }),
        new Rectangle({
          width: sizes.width,
          height: sizes.height,
          x: coordinates.x,
          y: Draw.removePixels(coordinates.y, 16),
          color: '#47300e',
        }),
      ],
    });
  }

  public init() {
    this.text.init();
  }

  public draw = () => {
    this.plate.draw();
    this.text.draw();
  };
}

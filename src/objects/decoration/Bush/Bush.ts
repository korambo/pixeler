import { Draw } from '@core/Draw';
import { Decoration } from '@objects/base/Decoration';

export class Bush extends Decoration {
  protected width = 14;
  protected height = 12;

  // eslint-disable-next-line class-methods-use-this
  public init() {}

  public draw() {
    const coordinates = this.getCoordinates();
    const img = this.assetsLoader.getImage('bush');

    Draw.drawImage(img, coordinates, this.getSizes());
  }
}

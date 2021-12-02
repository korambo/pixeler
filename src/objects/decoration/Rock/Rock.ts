import { Draw } from '@core/Draw';
import { Decoration } from '@objects/base/Decoration';

export class Rock extends Decoration {
  protected width = 12;
  protected height = 10;

  // eslint-disable-next-line class-methods-use-this
  public init() {}

  public draw() {
    const coordinates = this.getCoordinates();
    const img = this.assetsLoader.getImage('rock');

    Draw.drawImage(img, coordinates, this.getSizes());
  }
}

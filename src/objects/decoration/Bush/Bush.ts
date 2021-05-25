import { Draw } from '@core/Draw';
import { Decoration } from '@objects/base/Decoration';

export class Bush extends Decoration {
  protected width = 14;
  protected height = 12;

  public draw() {
    const coordinates = this.getCoordinates();
    const img = this.imageLoader.getImage('bush');

    Draw.drawImage(img, coordinates, this.getSizes());
  }
}

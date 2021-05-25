import { Draw } from '@core/Draw';
import { Decoration } from '@objects/base/Decoration';

export class Rock extends Decoration {
  protected width = 12;
  protected height = 10;

  public draw() {
    const coordinates = this.getCoordinates();
    const img = this.imageLoader.getImage('rock');

    Draw.drawImage(img, coordinates, this.getSizes());
  }
}

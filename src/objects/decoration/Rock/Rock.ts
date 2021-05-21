import { Draw } from '@core/Draw';
import { Decoration } from '@objects/base/Decoration';

export class Rock extends Decoration {
  width = 12;
  height = 10;

  public draw() {
    const coordinates = this.getCoordinates();
    const img = this.imageLoader.getImage('rock.png');

    Draw.drawImage(img, coordinates, this.getSizes());
  }
}

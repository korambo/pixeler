import { Draw } from '@core/Draw';
import { Decoration } from '@objects/base/Decoration';

export class Rock extends Decoration {
  width = 13;
  height = 13;

  public draw() {
    const coordinates = this.getCoordinates();
    const img = this.imageLoader.getImage('rock.svg');

    Draw.drawImage(img, coordinates, { width: this.width, height: this.height });
  }
}

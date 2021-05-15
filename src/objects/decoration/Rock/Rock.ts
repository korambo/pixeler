import { Draw } from '@core/Draw';
import { GameObject } from '@objects/base/GameObject';

export class Rock extends GameObject {
  width = 13;
  height = 13;

  // eslint-disable-next-line class-methods-use-this
  public boundaryCheck() {}

  public draw() {
    const coordinates = this.getCoordinates();
    const img = this.imageLoader.getImage('rock.svg');

    Draw.drawImage(img, coordinates, { width: this.width, height: this.height });
  }
}

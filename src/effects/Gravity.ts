import { Draw } from '@core/Draw';

export class Gravity {
  private gravityPower = Draw.getPixels(2);

  private accelerationPower = Draw.getPixels(1) / 4;

  getGravityPower = () => this.gravityPower;

  getAccelerationPower = () => this.accelerationPower;
}

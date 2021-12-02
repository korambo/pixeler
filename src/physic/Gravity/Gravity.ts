import { Draw } from '@core/Draw';

export class Gravity {
  private gravityPower = Draw.getPixels(2.5);
  private accelerationPower = Draw.getPixels(0.25);

  public getGravityPower = () => this.gravityPower;
  public getAccelerationPower = () => this.accelerationPower;
}

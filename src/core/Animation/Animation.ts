import { MovingGameObject } from '@objects/base/MovingGameObject';
import { Interaction } from '@objects/base/Interaction';

type AnimateObject = MovingGameObject | Interaction;

// interface AnimationProps {
//
// }

export class Animation {
  private object: AnimateObject;

  private counter: Record<string, number> = {};

  constructor(object: AnimateObject) {
    this.object = object;
  }

  private setCounter = (name: string, value: number) => {
    this.counter[name] = value;
  };

  private getCounter = (name: string) => {
    if (typeof this.counter[name] === 'undefined') this.counter[name] = 0;

    return this.counter[name];
  };

  public floatingY = () => {
    const animationName = 'floatingY';
    const { y } = this.object.getCoordinates();

    const counter = this.getCounter(animationName);

    if (counter < 40) {
      this.object.setCoordinates({ y: y - 0.5 });
      this.setCounter(animationName, counter + 1);
    } else if (counter < 80) {
      this.object.setCoordinates({ y: y + 0.5 });
      this.setCounter(animationName, counter + 1);
    } else {
      this.setCounter(animationName, 0);
    }
  };
}

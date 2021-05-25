import { Canvas, CanvasProps } from '@core/Canvas';
import { TSizes } from '@core/types';

interface LightProps extends CanvasProps, TSizes {

}

// TODO
export class Light extends Canvas {
  protected width: null;
  protected height: null;

  public constructor(props: LightProps) {
    super(props);

    this.setSizes({
      width: props.width,
      height: props.height,
    });
  }

  public draw = () => {

  };
}

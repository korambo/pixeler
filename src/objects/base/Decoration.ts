import { ImageLoader } from '@core/ImageLoader';
import { Canvas, CanvasProps } from '@core/Canvas';
import { Animation } from '@core/Animation';

export interface DecorationProps extends CanvasProps {
  imageLoader: ImageLoader;
}

export abstract class Decoration extends Canvas {
  protected imageLoader: ImageLoader;
  protected animation: Animation;

  public constructor(props: DecorationProps) {
    super(props);

    this.animation = new Animation(this);
    this.imageLoader = props.imageLoader;
  }
}

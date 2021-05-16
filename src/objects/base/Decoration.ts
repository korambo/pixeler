import { Canvas, CanvasProps } from '@core/Canvas';
import { ImageLoader } from '@core/ImageLoader';

export interface DecorationProps extends CanvasProps {
  imageLoader: ImageLoader;
}

export abstract class Decoration extends Canvas {
  protected imageLoader: ImageLoader;

  constructor(props: DecorationProps) {
    super(props);

    this.imageLoader = props.imageLoader;
  }
}

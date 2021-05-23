import { ImageLoader } from '@core/ImageLoader';
import { GameObject, GameObjectProps } from '@objects/base/GameObject';

export interface DecorationProps extends GameObjectProps {
  imageLoader: ImageLoader;
}

export abstract class Decoration extends GameObject {
  protected imageLoader: ImageLoader;

  constructor(props: GameObjectProps) {
    super(props);

    this.imageLoader = props.imageLoader;
  }
}

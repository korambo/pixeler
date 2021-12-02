import { Canvas, CanvasProps } from '@core/Canvas';
import { TCoordinates } from '@core/types';
import { AssetsLoader } from '@core/Assets/AssetsLoader';
import { Image } from '@core/Assets/Image';
import { Sprite } from '@core/Assets/Sprite';

export interface InterfaceProps extends CanvasProps, TCoordinates {
  assetsLoader: AssetsLoader;
}

export abstract class Interface extends Canvas {
  protected assetsLoader: AssetsLoader;

  protected image: Record<string, Image>;
  protected sprite: Record<string, Sprite>;

  protected constructor(props: InterfaceProps) {
    super(props);

    this.assetsLoader = props.assetsLoader;
  }
}

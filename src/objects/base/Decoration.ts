import { AssetsLoader } from '@core/Assets/AssetsLoader';
import { Canvas, CanvasProps } from '@core/Canvas';
import { Animation } from '@core/Animation';
import { Image } from '@core/Assets/Image';
import { Sprite } from '@core/Assets/Sprite';

export interface DecorationProps extends CanvasProps {
  assetsLoader: AssetsLoader;
}

export abstract class Decoration extends Canvas {
  protected assetsLoader: AssetsLoader;
  protected image: Record<string, Image>;
  protected sprite: Record<string, Sprite>;

  protected animation: Animation;

  public constructor(props: DecorationProps) {
    super(props);

    this.animation = new Animation(this);
    this.assetsLoader = props.assetsLoader;
  }
}

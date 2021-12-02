import { SubjectSize, WeaponSize, WeaponSizes } from '@objects/constants';
import { Canvas, CanvasProps } from '@core/Canvas';
import { TCoordinates } from '@core/types';
import { AssetsLoader } from '@core/Assets/AssetsLoader';
import { Image } from '@core/Assets/Image';
import { Sprite } from '@core/Assets/Sprite';
import { Subject } from '@objects/base/Subject';
import { Animation } from '@core/Animation';
import { Draw } from '@core/Draw';

export interface WeaponProps extends CanvasProps, TCoordinates {
  size: WeaponSize;
  subject: Subject;
  assetsLoader: AssetsLoader;
  animation: Animation;
}

export abstract class Weapon extends Canvas {
  protected width = null;
  protected height = null;

  protected image: Record<string, Image>;
  protected sprite: Record<string, Sprite>;

  protected assetsLoader: AssetsLoader;
  protected animation: Animation;

  protected subject: Subject;

  protected constructor(props: WeaponProps) {
    super(props);

    this.assetsLoader = props.assetsLoader;
    this.animation = props.animation;

    const sizes = WeaponSizes[props.size];

    this.subject = props.subject;

    this.width = sizes.width;
    this.height = sizes.height;
  }

  protected getWeaponCoordinates() {
    const { size } = this.subject;
    const coordinates = this.subject.getCoordinates();

    switch (size) {
      case SubjectSize.s: {
        return {
          x: coordinates.x - Draw.getPixels(7),
          y: coordinates.y - Draw.getPixels(5),
        };
      }
      case SubjectSize.m: {
        return {
          x: coordinates.x - Draw.getPixels(7),
          y: coordinates.y - Draw.getPixels(4),
        };
      }
    }
  }
}

import { Interface } from '@objects/base/Interface';
import { drawInteractionInfo } from '@objects/interface/InteractionInfo/draw';
import { CanvasProps } from '@core/Canvas';

export interface InteractionInfoProps extends CanvasProps {}

export class InteractionInfo extends Interface {
  protected width = 16;
  protected height = 10;

  public draw = () => {
    const coordinates = this.getCoordinates();
    const sizes = this.getSizes();

    drawInteractionInfo({ coordinates, sizes, flip: null });
  };
}

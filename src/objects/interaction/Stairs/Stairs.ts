import { Draw } from '@core/Draw';
import { Options } from '@core/Options';
import { Interaction, InteractionProps } from '@objects/base/Interaction';

interface StairsProps extends InteractionProps {
  count?: number;
}

const StairsHeight = 10;

export class Stairs extends Interaction {
  protected width = 15;
  protected height = null;

  protected interactionTime = 200;
  protected interactionPaddings = { left: -Draw.getPixels(5), right: -Draw.getPixels(5) };

  private pattern: CanvasPattern;
  private readonly count: number;

  public constructor(props: StairsProps) {
    super(props);

    this.count = props.count || 1;

    this.setSizes({ height: Draw.getPixels(StairsHeight * this.count) });
  }

  private setPattern = () => {
    const img = this.imageLoader.getImage('stairs');
    this.pattern = Draw.getPattern(img, { width: this.width, height: StairsHeight });
  };

  // public boundaryCheck(movingObject: MovingGameObject) {
  //   if (movingObject instanceof Player) {
  //     const intersectedEdges = canIntersectEdges(this, movingObject.getEdgePolygon(Edge.bottom));
  //
  //     if (intersectedEdges.top) {
  //       movingObject.setMoveOrientation([MoveOrientation.horizontal, MoveOrientation.down]);
  //       return;
  //     }
  //
  //     if (canIntersect(this, movingObject.getEdgePolygon(Edge.bottom), this.interactionPaddings)) {
  //       movingObject.setMoveOrientation([MoveOrientation.full]);
  //     }
  //   }
  // }

  public animate = () => {};

  public draw() {
    const { ctx } = Options.getCanvasOptions();
    const sizes = this.getSizes();
    const coordinates = this.getCoordinates();

    if (!this.pattern) {
      this.setPattern();
    }

    ctx.beginPath();
    ctx.fillStyle = this.pattern;
    ctx.fillRect(coordinates.x, coordinates.y, sizes.width, sizes.height);
    ctx.fill();
  }

  public inputEffects = () => {};
}

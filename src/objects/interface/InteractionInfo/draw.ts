import { Draw, DrawParams } from '@core/Draw';
import { Rectangle } from '@geometry/Rectangle';
import { Options } from '@core/Options';

const drawPlate = ({ coordinates, sizes }: DrawParams) => new Draw({
  ...coordinates,
  ...sizes,

  elements: [
    new Rectangle({
      width: sizes.width,
      height: sizes.height,
      x: Draw.addPixels(coordinates.x, 2),
      y: Draw.removePixels(coordinates.y, 18),
      color: '#b75d2a',
      filled: true,
    }),
    new Rectangle({
      width: sizes.width,
      height: sizes.height,
      x: Draw.addPixels(coordinates.x, 2),
      y: Draw.removePixels(coordinates.y, 18),
      color: '#47300e',
    }),
  ],
});

const drawText = ({ coordinates, sizes }: DrawParams) => ({
  draw() {
    const { ctx } = Options.getCanvasOptions();

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.fillText(
      'F',
      Draw.removePixels(coordinates.x + sizes.width / 2, 1),
      Draw.removePixels(coordinates.y, 12),
    );
    ctx.fill();
  },
});

export const drawInteractionInfo = (params: DrawParams) => {
  drawPlate(params).draw();
  drawText(params).draw();
};

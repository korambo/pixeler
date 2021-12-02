import { Draw, DrawParams } from '@core/Draw';
import { Rectangle } from '@geometry/Rectangle';

const colors = {
  empty: 'red',
  full: 'green',
};

const drawBar = ({ coordinates, sizes }: DrawParams, { innerSize }: any) => new Draw({
  ...coordinates,
  ...sizes,

  elements: [
    new Rectangle({
      width: sizes.width,
      height: sizes.height,
      x: Draw.addPixels(coordinates.x, 2),
      y: Draw.removePixels(coordinates.y, 6),
      color: colors.empty,
      filled: true,
    }),
    new Rectangle({
      width: innerSize,
      height: sizes.height,
      x: Draw.addPixels(coordinates.x, 2),
      y: Draw.removePixels(coordinates.y, 6),
      color: colors.full,
      filled: true,
    }),
  ],
});

export const drawHealthBar = (params: DrawParams, props: any) => {
  let innerSize = (params.sizes.width / 100) * (props.count / (props.max / 100));

  if (innerSize < 0) {
    innerSize = 0;
  }

  drawBar(params, { innerSize }).draw();
};

import { Rectangle } from '@geometry/Rectangle';
import { Draw, DrawParams } from '@core/Draw';

const colors = {
  border: '#16181e',
  mainColor: '#887777',
  secondColor: '#665555',
  accent: '#178178',
  help: '#ffffff',
};

const head = ({ sizes, coordinates }: DrawParams) => new Draw({
  ...sizes,
  ...coordinates,

  elements: [
    // head fill
    new Rectangle({
      width: sizes.width,
      height: Draw.removePixels(sizes.height, 1),
      x: coordinates.x,
      y: coordinates.y,
      color: colors.mainColor,
      filled: true,
    }),

    // head border
    new Rectangle({
      width: sizes.width,
      height: Draw.removePixels(sizes.height, 1),
      x: coordinates.x,
      y: coordinates.y,
      color: colors.border,
    }),
  ],
});

const eyes = ({ sizes, coordinates, flip }: DrawParams) => new Draw({
  ...sizes,
  ...coordinates,
  flip,

  elements: [
    // left
    new Rectangle({
      width: Draw.getPixels(2),
      height: Draw.getPixels(2),
      x: Draw.addPixels(coordinates.x, 3),
      y: Draw.addPixels(coordinates.y, 9),
      color: colors.accent,
      filled: true,
    }),

    // right
    new Rectangle({
      width: Draw.addPixels(0, 1),
      height: Draw.addPixels(0, 2),
      x: Draw.addPixels(coordinates.x, 8),
      y: Draw.addPixels(coordinates.y, 9),
      color: colors.accent,
      filled: true,
    }),
  ],
});

const shadow = ({ sizes, coordinates, flip }: DrawParams) => new Draw({
  ...sizes,
  ...coordinates,
  flip,

  elements: [
    // left
    new Rectangle({
      width: Draw.addPixels(0, 1),
      height: Draw.removePixels(sizes.height, 3),
      x: Draw.addPixels(coordinates.x, 1),
      y: Draw.addPixels(coordinates.y, 1),
      color: colors.secondColor,
      filled: true,
    }),

    // forehead
    new Rectangle({
      width: Draw.addPixels(0, 3),
      height: Draw.addPixels(0, 1),
      x: Draw.addPixels(coordinates.x, 5),
      y: Draw.addPixels(coordinates.y, 2),
      color: colors.secondColor,
      filled: true,
    }),
    new Rectangle({
      width: Draw.addPixels(0, 3),
      height: Draw.addPixels(0, 1),
      x: Draw.addPixels(coordinates.x, 5),
      y: Draw.addPixels(coordinates.y, 4),
      color: colors.secondColor,
      filled: true,
    }),
    new Rectangle({
      width: Draw.addPixels(0, 3),
      height: Draw.addPixels(0, 1),
      x: Draw.addPixels(coordinates.x, 5),
      y: Draw.addPixels(coordinates.y, 6),
      color: colors.secondColor,
      filled: true,
    }),

    // eyes
    new Rectangle({
      width: Draw.addPixels(0, 2),
      height: Draw.addPixels(0, 2),
      x: Draw.addPixels(coordinates.x, 3),
      y: Draw.addPixels(coordinates.y, 11),
      color: colors.secondColor,
      filled: true,
    }),
    new Rectangle({
      width: Draw.addPixels(0, 1),
      height: Draw.addPixels(0, 2),
      x: Draw.addPixels(coordinates.x, 8),
      y: Draw.addPixels(coordinates.y, 11),
      color: colors.secondColor,
      filled: true,
    }),
  ],
});

const legs = ({ sizes, coordinates, flip }: DrawParams) => new Draw({
  ...sizes,
  ...coordinates,
  flip,

  elements: [
    // left leg
    new Rectangle({
      width: Draw.getPixels(2),
      height: Draw.getPixels(1),
      x: coordinates.x,
      y: Draw.removePixels(coordinates.y + sizes.height, 1),
      color: colors.border,
      filled: true,
    }),

    // right leg
    new Rectangle({
      width: Draw.getPixels(2),
      height: Draw.getPixels(1),
      x: Draw.addPixels(coordinates.x, 6),
      y: Draw.removePixels(coordinates.y + sizes.height, 1),
      color: colors.border,
      filled: true,
    }),
  ],
});

const mouth = ({ sizes, coordinates, flip }: DrawParams) => new Draw({
  ...sizes,
  ...coordinates,
  flip,

  elements: [
    // inner
    new Rectangle({
      width: Draw.removePixels(sizes.width, 2),
      height: Draw.getPixels(4),
      x: Draw.addPixels(coordinates.x, 1),
      y: Draw.removePixels(coordinates.y + sizes.height, 7),
      color: colors.help,
      filled: true,
      canFlip: false,
    }),

    ...new Array(8).fill(null).map((_, i) => new Rectangle({
      width: Draw.getPixels(1),
      height: Draw.getPixels(3),
      x: Draw.addPixels(coordinates.x, 1 + i),
      y: Draw.removePixels(coordinates.y + sizes.height, i % 2 ? 6 : 7),
      color: colors.border,
      filled: true,
    })),
  ],
});

export const drawPlayer = (params: DrawParams) => {
  head(params).draw();
  shadow(params).draw();
  eyes(params).draw();
  mouth(params).draw();
  legs(params).draw();
};

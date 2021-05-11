import { Rectangle } from '@geometry/Rectangle';
import { Draw, DrawParams } from '@core/Draw';

const colors = {
  border: '#47300e',

  mainColor: '#b75d2a',
  mainColorShadow: '#844323',
  mainColorLight: '#dd6f37',

  secondColor: '#d89a1e',
  secondColorShadow: '#a8751a',
  secondColorLight: '#f7ac28',
};

const bottom = ({ sizes, coordinates }: DrawParams) => new Draw({
  ...sizes,
  ...coordinates,

  elements: [
    new Rectangle({
      width: Draw.removePixels(sizes.width, 6),
      height: Draw.getPixels(3),
      x: Draw.addPixels(coordinates.x, 3),
      y: Draw.addPixels(coordinates.y, 9),
      color: colors.mainColor,
      filled: true,
    }),
    new Rectangle({
      width: Draw.removePixels(sizes.width, 4),
      height: Draw.getPixels(5),
      x: Draw.addPixels(coordinates.x, 2),
      y: Draw.addPixels(coordinates.y, 8),
      color: colors.border,
    }),
    new Rectangle({
      width: Draw.removePixels(sizes.width, 2),
      height: Draw.getPixels(7),
      x: Draw.addPixels(coordinates.x, 1),
      y: Draw.addPixels(coordinates.y, 7),
      color: colors.secondColor,
    }),
    new Rectangle({
      width: sizes.width,
      height: Draw.getPixels(9),
      x: coordinates.x,
      y: Draw.addPixels(coordinates.y, 6),
      color: colors.border,
    }),

    new Rectangle({
      width: Draw.removePixels(sizes.width, 2),
      height: Draw.getPixels(1),
      x: Draw.addPixels(coordinates.x, 1),
      y: Draw.addPixels(coordinates.y, 7),
      color: colors.secondColorLight,
      filled: true,
    }),
  ],
});

const closedCover = ({ sizes, coordinates }: DrawParams) => new Draw({
  ...sizes,
  ...coordinates,

  elements: [
    // cover
    new Rectangle({
      width: Draw.removePixels(sizes.width, 6),
      height: Draw.getPixels(5),
      x: Draw.addPixels(coordinates.x, 3),
      y: Draw.addPixels(coordinates.y, 1),
      color: colors.mainColor,
      filled: true,
    }),
    new Rectangle({
      width: Draw.removePixels(sizes.width, 2),
      height: Draw.getPixels(8),
      x: Draw.addPixels(coordinates.x, 1),
      y: coordinates.y,
      color: colors.secondColor,
    }),
    new Rectangle({
      width: Draw.removePixels(sizes.width, 4),
      height: Draw.getPixels(7),
      x: Draw.addPixels(coordinates.x, 2),
      y: coordinates.y,
      color: colors.border,
    }),
    new Rectangle({
      width: sizes.width,
      height: Draw.getPixels(9),
      x: coordinates.x,
      y: coordinates.y,
      color: colors.border,
    }),
    // lights
    new Rectangle({
      width: Draw.removePixels(sizes.width, 6),
      height: Draw.getPixels(2),
      x: Draw.addPixels(coordinates.x, 3),
      y: Draw.addPixels(coordinates.y, 2),
      color: colors.mainColorLight,
      filled: true,
    }),
    new Rectangle({
      width: Draw.getPixels(1),
      height: Draw.getPixels(2),
      x: Draw.addPixels(coordinates.x, 1),
      y: Draw.addPixels(coordinates.y, 2),
      color: colors.secondColorLight,
      filled: true,
    }),
    new Rectangle({
      width: Draw.getPixels(1),
      height: Draw.getPixels(2),
      x: Draw.removePixels(coordinates.x + sizes.width, 2),
      y: Draw.addPixels(coordinates.y, 2),
      color: colors.secondColorLight,
      filled: true,
    }),
    // shadow
    new Rectangle({
      width: Draw.getPixels(2),
      height: Draw.getPixels(1),
      x: Draw.addPixels(coordinates.x, 8),
      y: Draw.addPixels(coordinates.y, 11),
      color: colors.mainColorShadow,
      filled: true,
    }),
    new Rectangle({
      width: Draw.getPixels(1),
      height: Draw.getPixels(1),
      x: Draw.addPixels(coordinates.x, 7),
      y: Draw.addPixels(coordinates.y, 10),
      color: colors.mainColorShadow,
      filled: true,
    }),
    new Rectangle({
      width: Draw.getPixels(1),
      height: Draw.getPixels(1),
      x: Draw.addPixels(coordinates.x, 10),
      y: Draw.addPixels(coordinates.y, 10),
      color: colors.mainColorShadow,
      filled: true,
    }),
    new Rectangle({
      width: Draw.removePixels(sizes.width, 6),
      height: Draw.getPixels(1),
      x: Draw.addPixels(coordinates.x, 3),
      y: Draw.addPixels(coordinates.y, 9),
      color: colors.mainColorShadow,
      filled: true,
    }),
    new Rectangle({
      width: Draw.getPixels(1),
      height: Draw.getPixels(1),
      x: Draw.addPixels(coordinates.x, 1),
      y: Draw.addPixels(coordinates.y, 9),
      color: colors.secondColorShadow,
      filled: true,
    }),
    new Rectangle({
      width: Draw.getPixels(1),
      height: Draw.getPixels(1),
      x: Draw.removePixels(coordinates.x + sizes.width, 2),
      y: Draw.addPixels(coordinates.y, 9),
      color: colors.secondColorShadow,
      filled: true,
    }),
    // lock
    new Rectangle({
      width: Draw.getPixels(1),
      height: Draw.getPixels(4),
      x: Draw.addPixels(coordinates.x, 7),
      y: Draw.addPixels(coordinates.y, 6),
      color: colors.border,
      filled: true,
    }),
    new Rectangle({
      width: Draw.getPixels(1),
      height: Draw.getPixels(4),
      x: Draw.addPixels(coordinates.x, 10),
      y: Draw.addPixels(coordinates.y, 6),
      color: colors.border,
      filled: true,
    }),
    new Rectangle({
      width: Draw.getPixels(2),
      height: Draw.getPixels(1),
      x: Draw.addPixels(coordinates.x, 8),
      y: Draw.addPixels(coordinates.y, 5),
      color: colors.border,
      filled: true,
    }),
    new Rectangle({
      width: Draw.getPixels(2),
      height: Draw.getPixels(1),
      x: Draw.addPixels(coordinates.x, 8),
      y: Draw.addPixels(coordinates.y, 10),
      color: colors.border,
      filled: true,
    }),
    new Rectangle({
      width: Draw.getPixels(2),
      height: Draw.getPixels(4),
      x: Draw.addPixels(coordinates.x, 8),
      y: Draw.addPixels(coordinates.y, 6),
      color: colors.secondColor,
      filled: true,
    }),
    // shadow at lock
    new Rectangle({
      width: Draw.getPixels(2),
      height: Draw.getPixels(1),
      x: Draw.addPixels(coordinates.x, 8),
      y: Draw.addPixels(coordinates.y, 9),
      color: colors.secondColorShadow,
      filled: true,
    }),
  ],
});

export const drawEmpty = (params: DrawParams) => {
  bottom(params).draw();
};

export const drawClosed = (params: DrawParams) => {
  bottom(params).draw();
  closedCover(params).draw();
};

export const drawOpened = (params: DrawParams) => {
  bottom(params).draw();
};

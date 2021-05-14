import { GAME_HEIGHT, GAME_WIDTH } from '@core/constants';
import { DebugOptions } from '@core/Options/types';

export class Options {
  private static inited: boolean;

  private static debug: DebugOptions | boolean;

  private static canvas: HTMLCanvasElement;
  private static ctx: CanvasRenderingContext2D;
  private static cellSize: number;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static init = (canvasId: string, debug?: DebugOptions | boolean) => {
    Options.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    Options.ctx = Options.canvas.getContext('2d');

    Options.cellSize = Math.sqrt((Options.canvas.width * Options.canvas.height) / (GAME_WIDTH * GAME_HEIGHT));

    Options.debug = debug;

    Options.inited = true;
  };

  public static getCanvasOptions() {
    if (!Options.inited) throw new Error('Options were not initialized!');

    return {
      canvas: Options.canvas,
      ctx: Options.ctx,
      cellSize: Options.cellSize,
    };
  }

  public static getDebug = (): DebugOptions => {
    if (typeof Options.debug === 'undefined' || typeof Options.debug === 'boolean') {
      return {
        coordinates: Boolean(Options.debug),
        info: Boolean(Options.debug),
      };
    }

    return Options.debug;
  };
}

import { GAME_HEIGHT, GAME_WIDTH } from '@core/constants';

export class Options {
  private static inited: boolean;

  private static canvas: HTMLCanvasElement;
  private static ctx: CanvasRenderingContext2D;
  private static cellSize: number;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static init = (canvasId: string) => {
    Options.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    Options.ctx = Options.canvas.getContext('2d');

    Options.cellSize = Math.sqrt((Options.canvas.width * Options.canvas.height) / (GAME_WIDTH * GAME_HEIGHT));

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
}

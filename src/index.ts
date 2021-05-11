import { Game } from '@core/Game';
import { Options } from '@core/Options';

import './style.css';

const createCanvas = (canvasId: string) => {
  const canvas = document.createElement('canvas');
  canvas.id = canvasId;
  canvas.width = 1280;
  canvas.height = 720;

  document.body.appendChild(canvas);
};

const init = () => {
  const id = 'game';

  createCanvas(id);

  Options.init(id);

  const game = new Game({ debug: true });

  // @ts-ignore
  window.game = game;

  game.draw();
};

init();

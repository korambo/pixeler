import { Game } from '@core/Game';
import { Options } from '@core/Options';

// import { PhysicTest } from '@maps/PhysicTest';

import './style.css';

const createCanvas = (canvasId: string) => {
  const canvas = document.createElement('canvas');
  canvas.id = canvasId;
  canvas.width = 1280;
  canvas.height = 720;

  document.body.appendChild(canvas);
};

const init = () => {
  const canvasId = 'game';

  createCanvas(canvasId);

  Options.init({ canvasId, debug: { boxes: false, info: false } });

  const game = new Game({
    // customMap: PhysicTest,
  });

  // @ts-ignore
  window.game = game;

  game.draw();
};

init();

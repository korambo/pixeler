import { Game } from '@core/Game';
import { Options } from '@core/Options';
import { Draw } from '@core/Draw';

// import { PhysicTest } from '@maps/PhysicTest';

import './style.css';

const createCanvas = (canvasId: string) => {
  const { canvas } = Draw.createCanvas({ width: 1280, height: 720 });
  canvas.id = canvasId;
  document.body.appendChild(canvas);
};

const init = () => {
  const canvasId = 'game';

  createCanvas(canvasId);

  Options.init({ canvasId, debug: { boxes: false, info: true } });

  const game = new Game({
    // customMap: PhysicTest,
  });

  // @ts-ignore
  window.game = game;

  game.draw();
};

init();

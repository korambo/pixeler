import { Game } from '@core/Game';

import './style.css';

const createCanvas = () => {
  const canvas = document.createElement('canvas');
  canvas.id = 'game';

  canvas.width = 800;
  canvas.height = 600;
  document.body.appendChild(canvas);
};

createCanvas();

const game = new Game({ canvasId: 'game', debug: true });

// @ts-ignore
window.game = game;

game.draw();

const KEY_UP = 'KeyW';
const KEY_RIGHT = 'KeyD';
const KEY_DOWN = 'KeyS';
const KEY_LEFT = 'KeyA';

const KEY_ATTACK = 'ArrowRight';
const KEY_ACTION = 'KeyF';
const KEY_JUMP = 'Space';

const defaultPressed = {
  up: false,
  right: false,
  down: false,
  left: false,
  jump: false,
  action: false,
  attack: false,
};

// TODO переработать
export class Inputs {
  private keysPressed = { ...defaultPressed };

  public constructor() {
    document.body.addEventListener('keydown', this.keyDown);
    document.body.addEventListener('keyup', this.keyUp);
  }

  public getKeysPressed = () => this.keysPressed;

  private keyDown = (e: KeyboardEvent) => {
    switch (e.code) {
      case KEY_UP: {
        this.keysPressed.up = true;
        break;
      }
      case KEY_RIGHT: {
        this.keysPressed.right = true;
        break;
      }
      case KEY_DOWN: {
        this.keysPressed.down = true;
        break;
      }
      case KEY_LEFT: {
        this.keysPressed.left = true;
        break;
      }
      case KEY_JUMP: {
        this.keysPressed.jump = true;
        break;
      }
      case KEY_ACTION: {
        this.keysPressed.action = true;
        break;
      }
      case KEY_ATTACK: {
        this.keysPressed.attack = true;
        break;
      }
    }
  };

  private keyUp = (e: KeyboardEvent) => {
    switch (e.code) {
      case KEY_UP: {
        this.keysPressed.up = false;
        break;
      }
      case KEY_RIGHT: {
        this.keysPressed.right = false;
        break;
      }
      case KEY_DOWN: {
        this.keysPressed.down = false;
        break;
      }
      case KEY_LEFT: {
        this.keysPressed.left = false;
        break;
      }
      case KEY_JUMP: {
        this.keysPressed.jump = false;
        break;
      }
      case KEY_ACTION: {
        this.keysPressed.action = false;
        break;
      }
      case KEY_ATTACK: {
        this.keysPressed.attack = false;
        break;
      }
    }
  };
}

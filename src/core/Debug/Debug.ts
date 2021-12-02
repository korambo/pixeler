import { Options } from '@core/Options';
import { Canvas } from '@core/Canvas';
import { Camera } from '@core/Camera';

interface DebugInfo {
  key: string;
  text: string;
}

interface DebugProps {
  items: Canvas[];
  camera: Camera;
}

export class Debug {
  private info: Record<string, boolean> = {};

  private items: Canvas[];
  private camera: Camera;

  private lastTime: number;
  private draws: number = 0;
  private fps: number = 0;

  public constructor(props: DebugProps) {
    this.camera = props.camera;
    this.items = props.items;

    this.lastTime = Math.ceil(new Date().getTime() / 1000);
  }

  private getDebugInfo = (canvas: Canvas): DebugInfo => {
    const coordinates = canvas.getCoordinates();

    return {
      key: canvas.constructor.name,
      text: `${canvas.constructor.name}: x=${coordinates.x} y=${coordinates.y}`,
    };
  };

  private drawItem = ({ key, text }: DebugInfo) => {
    const cameraCoordinates = this.camera.selectedCoordinates;
    const { ctx } = Options.getCanvasOptions();

    this.info[key] = true;
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.font = '14px arial';
    ctx.fillText(text, cameraCoordinates.x + 10, 20 + 20 * Object.keys(this.info).indexOf(key) + cameraCoordinates.y);

    ctx.fill();
  };

  public drawCoordinates = () => {
    this.items.forEach((item) => {
      this.drawItem(this.getDebugInfo(item));
    });
  };

  public drawInfo = () => {
    const debug = Options.getDebug();
    const time = Math.ceil(new Date().getTime() / 1000);

    if (time > this.lastTime) {
      this.lastTime = time;
      this.fps = this.draws;
      this.draws = 0;
    }

    this.drawItem({ key: 'fps', text: `fps: ${this.fps}` });

    this.draws++;

    Object.keys(debug).forEach((key) => {
      this.drawItem({ key, text: `${key}: ${debug[key]}` });
    });
  };
}

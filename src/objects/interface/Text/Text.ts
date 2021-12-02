import { Interface, InterfaceProps } from '@objects/base/Interface';
import { Sprite } from '@core/Assets/Sprite';
import { Image } from '@core/Assets/Image';
import { Draw } from '@core/Draw';
import { TCoordinates } from '@core/types';
import { SYMBOL_TILE_SIZE, SymbolImageSize } from '@core/constants';

interface SymbolImage { source: Image, size: SymbolImageSize }

interface TextProps extends InterfaceProps {
  message: string;
  maxWidth?: number;
  color?: string;
}

export class Text extends Interface {
  protected width = null;
  protected height = null;

  private textCanvas: { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D };
  private colorCanvas: { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D };
  private maxWidth: number;
  private color: string;
  private message: string[];

  public constructor(props: TextProps) {
    super(props);

    this.message = props.message.toLowerCase().split('');
    this.maxWidth = props.maxWidth;
    this.color = props.color;

    const width = Draw.getPixels(SYMBOL_TILE_SIZE * this.message.length);
    const height = Draw.getPixels(SYMBOL_TILE_SIZE);

    this.setSizes({ width, height });

    this.textCanvas = Draw.createCanvas({ width, height });
    this.colorCanvas = Draw.createCanvas({ width, height });
  }

  private getSymbolImage(symbol: string): SymbolImage {
    const { base } = this.sprite;

    switch (symbol) {
      case ' ': return { source: base.getFrame([0, 0]), size: SymbolImageSize.s };
      case 'a': return { source: base.getFrame([1, 0]), size: SymbolImageSize.s };
      case 'b': return { source: base.getFrame([2, 0]), size: SymbolImageSize.s };
      case 'c': return { source: base.getFrame([3, 0]), size: SymbolImageSize.s };
      case 'd': return { source: base.getFrame([4, 0]), size: SymbolImageSize.m };
      case 'e': return { source: base.getFrame([5, 0]), size: SymbolImageSize.s };
      case 'f': return { source: base.getFrame([6, 0]), size: SymbolImageSize.s };
      case 'g': return { source: base.getFrame([0, 1]), size: SymbolImageSize.m };
      case 'h': return { source: base.getFrame([1, 1]), size: SymbolImageSize.s };
      case 'i': return { source: base.getFrame([2, 1]), size: SymbolImageSize.s };
      case 'j': return { source: base.getFrame([3, 1]), size: SymbolImageSize.s };
      case 'k': return { source: base.getFrame([4, 1]), size: SymbolImageSize.s };
      case 'l': return { source: base.getFrame([5, 1]), size: SymbolImageSize.s };
      case 'm': return { source: base.getFrame([6, 1]), size: SymbolImageSize.l };
      case 'n': return { source: base.getFrame([0, 2]), size: SymbolImageSize.m };
      case 'o': return { source: base.getFrame([1, 2]), size: SymbolImageSize.s };
      case 'p': return { source: base.getFrame([2, 2]), size: SymbolImageSize.s };
      case 'q': return { source: base.getFrame([3, 2]), size: SymbolImageSize.l };
      case 'r': return { source: base.getFrame([4, 2]), size: SymbolImageSize.s };
      case 's': return { source: base.getFrame([5, 2]), size: SymbolImageSize.s };
      case 't': return { source: base.getFrame([6, 2]), size: SymbolImageSize.s };
      case 'u': return { source: base.getFrame([0, 3]), size: SymbolImageSize.m };
      case 'v': return { source: base.getFrame([1, 3]), size: SymbolImageSize.s };
      case 'w': return { source: base.getFrame([2, 3]), size: SymbolImageSize.l };
      case 'x': return { source: base.getFrame([3, 3]), size: SymbolImageSize.s };
      case 'y': return { source: base.getFrame([4, 3]), size: SymbolImageSize.s };
      case 'z': return { source: base.getFrame([5, 3]), size: SymbolImageSize.m };
      case '0': return { source: base.getFrame([6, 3]), size: SymbolImageSize.s };
      case '1': return { source: base.getFrame([0, 4]), size: SymbolImageSize.s };
      case '2': return { source: base.getFrame([1, 4]), size: SymbolImageSize.s };
      case '3': return { source: base.getFrame([2, 4]), size: SymbolImageSize.s };
      case '4': return { source: base.getFrame([3, 4]), size: SymbolImageSize.s };
      case '5': return { source: base.getFrame([4, 4]), size: SymbolImageSize.s };
      case '6': return { source: base.getFrame([5, 4]), size: SymbolImageSize.s };
      case '7': return { source: base.getFrame([6, 4]), size: SymbolImageSize.s };
      case '8': return { source: base.getFrame([0, 5]), size: SymbolImageSize.s };
      case '9': return { source: base.getFrame([1, 5]), size: SymbolImageSize.s };
      case '.': return { source: base.getFrame([2, 5]), size: SymbolImageSize.xxs };
      case '?': return { source: base.getFrame([3, 5]), size: SymbolImageSize.s };
      case '!': return { source: base.getFrame([4, 5]), size: SymbolImageSize.xxs };
      case '-': return { source: base.getFrame([5, 5]), size: SymbolImageSize.s };
      case '+': return { source: base.getFrame([6, 5]), size: SymbolImageSize.s };
      case '=': return { source: base.getFrame([0, 6]), size: SymbolImageSize.s };
      case ':': return { source: base.getFrame([1, 6]), size: SymbolImageSize.xxs };
      case '(': return { source: base.getFrame([2, 6]), size: SymbolImageSize.xs };
      case ')': return { source: base.getFrame([3, 6]), size: SymbolImageSize.xs };
      default: return { source: null, size: null };
    }
  }

  public init() {
    this.sprite = {
      base: new Sprite({
        frameSize: {
          width: SYMBOL_TILE_SIZE,
          height: SYMBOL_TILE_SIZE,
        },
        image: this.assetsLoader.getImage('text_sprite'),
        customCtx: this.textCanvas.ctx,
      }),
    };

    const sizes = this.getSizes();
    const coordinates = { x: 0, y: 0 };
    let lastPosition: TCoordinates = { ...coordinates };

    this.colorCanvas.ctx.beginPath();
    this.colorCanvas.ctx.fillStyle = this.color || 'black';
    this.colorCanvas.ctx.fillRect(0, 0, sizes.width, sizes.height);
    this.colorCanvas.ctx.fill();

    this.colorCanvas.ctx.globalCompositeOperation = 'destination-in';

    this.message.forEach((symbol) => {
      const { source, size } = this.getSymbolImage(symbol);

      if (!source || !size) return;

      source.drawImage(lastPosition);

      const positionX = Draw.addPixels(lastPosition.x, size + 1);

      lastPosition = {
        x: positionX > coordinates.x + this.maxWidth ? coordinates.x : positionX,
        y: coordinates.y,
      };
    });

    this.colorCanvas.ctx.drawImage(this.textCanvas.canvas, 0, 0);
  }

  public draw() {
    Draw.drawCanvas(this.colorCanvas.canvas, this.getCoordinates(), this.getSizes());
  }
}

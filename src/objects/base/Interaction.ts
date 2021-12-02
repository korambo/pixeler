import { GameObject, GameObjectProps } from '@objects/base/GameObject';
import { Inputs } from '@core/Inputs';
import { InteractionInfo } from '@objects/interface/InteractionInfo';
import { Animation } from '@core/Animation';
import { Physic } from '@physic/Physic';

export interface InteractionProps extends GameObjectProps {
  inputs: Inputs;
}

export abstract class Interaction extends GameObject {
  protected inputs: Inputs;

  protected animation: Animation;

  private interactionTimeout: NodeJS.Timeout = null;

  protected abstract interactionTime: number;

  protected info: InteractionInfo;

  public constructor(props: InteractionProps) {
    super(props);

    const sizes = this.getSizes();

    this.info = new InteractionInfo({
      x: this.x,
      y: this.y,
      width: sizes.width,
      height: sizes.height,
      assetsLoader: props.assetsLoader,
    });

    this.animation = new Animation(this);

    this._physic = new Physic({
      gravity: this.gravity,
      object: this,
      canCollision: false,
      canInteraction: true,
    });

    this.inputs = props.inputs;
  }

  abstract animate(): void;

  abstract inputEffects(): void;

  public canInteract() {
    return !this.interactionTimeout;
  }

  public setInteractionTimeout() {
    this.interactionTimeout = setTimeout(() => {
      this.clearInteractionTimeout();
    }, this.interactionTime);
  }

  public clearInteractionTimeout() {
    this.interactionTimeout = null;
  }

  public init() {
    this.info.init();
  }
}

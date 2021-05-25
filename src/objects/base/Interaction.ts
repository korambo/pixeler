import { GameObject, GameObjectProps } from '@objects/base/GameObject';
import { Inputs } from '@effects/Inputs';
import { InteractionInfo } from '@objects/interface/InteractionInfo';
import { Animation } from '@core/Animation';
import { Physic } from '@effects/Physic';

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

    this.info = new InteractionInfo({ x: this.x, y: this.y });

    this.animation = new Animation(this);

    this._physic = new Physic({
      gravity: this.gravity,
      object: this,
      canCollision: false,
    });

    this.inputs = props.inputs;
  }

  abstract animate(): void;

  abstract inputEffects(): void;

  public canInteract = () => !this.interactionTimeout;

  public setInteractionTimeout = () => {
    this.interactionTimeout = setTimeout(() => {
      this.clearInteractionTimeout();
    }, this.interactionTime);
  };

  public clearInteractionTimeout = () => {
    this.interactionTimeout = null;
  };
}

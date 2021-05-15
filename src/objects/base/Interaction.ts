import { GameObject, GameObjectProps } from '@objects/base/GameObject';
import { Inputs } from '@effects/Inputs';
import { TPaddings } from '@core/types';
import { InteractionInfo } from '@objects/interface/InteractionInfo';
import { Animation } from '@core/Animation/Animation';

export interface InteractionProps extends GameObjectProps {
  inputs: Inputs;
}

export abstract class Interaction extends GameObject {
  protected inputs: Inputs;

  protected animation: Animation;

  private interactionTimeout: NodeJS.Timeout = null;

  protected abstract interactionTime: number;

  protected abstract interactionPaddings: Partial<TPaddings>;

  protected info: InteractionInfo;

  constructor(props: InteractionProps) {
    super(props);

    this.info = new InteractionInfo({ x: this.x, y: this.y });

    this.animation = new Animation(this);

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

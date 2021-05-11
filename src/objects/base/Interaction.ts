import { GameObject, GameObjectProps } from '@objects/base/GameObject';
import { Inputs } from '@effects/Inputs';
import { TPaddings } from '@core/types';

export interface InteractionProps extends GameObjectProps {
  inputs: Inputs;
}

export abstract class Interaction extends GameObject {
  protected inputs: Inputs;

  private interactionTimeout: NodeJS.Timeout = null;

  protected abstract interactionTime: number;

  protected abstract interactionPaddings: Partial<TPaddings>;

  protected constructor(props: InteractionProps) {
    super(props);

    this.inputs = props.inputs;
  }

  abstract inputEffects(): void;

  public canInteract = () => {
    return !this.interactionTimeout;
  }

  public setInteractionTimeout = () => {
    this.interactionTimeout = setTimeout(() => {
      this.clearInteractionTimeout();
    }, this.interactionTime);
  }

  public clearInteractionTimeout = () => {
    this.interactionTimeout = null;
  }
}
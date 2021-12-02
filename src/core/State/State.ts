export interface StateProps<T> {
  initState: T;
}

export class State<T extends Record<string, any>> {
  private _state: T;

  public constructor(initState: T) {
    this._state = initState;
  }

  public set(state: Partial<T>) {
    this._state = { ...this._state, ...state };
  }

  public get() {
    return this._state;
  }
}

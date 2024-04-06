export default abstract class Store<
  TState extends object,
  TActionType extends string
> {
  protected state: TState = {} as TState;
  protected subscribers: Partial<
    Record<TActionType, Array<(state: TState) => void>>
  > = {};

  public getState(): TState;
  public getState<T extends keyof TState>(field: T): TState[T];
  public getState<T extends keyof TState>(
    field?: keyof TState
  ): TState | TState[T] {
    if (!field) {
      return this.state;
    }

    const fieldData = this.state[field];

    switch (typeof fieldData) {
      case "string":
        return fieldData as TState[T];
      case "object": {
        if (Array.isArray(fieldData)) {
          return [...(fieldData as TState[T][])] as TState[T];
        }

        return { ...fieldData } as TState[T];
      }
      default: {
        return this.state;
      }
    }
  }

  protected setState(newState: Partial<TState>) {
    Object.assign(this.state, newState);
  }

  public subscribe(callback: (state: TState) => void) {
    Object.keys(this.subscribers).forEach((key) => {
      if (!this.subscribers[key as keyof typeof this.subscribers]) {
        this.subscribers[key as keyof typeof this.subscribers] = [];
      }

      this.subscribers[key as keyof typeof this.subscribers]?.push(callback);
    });
  }

  public subscribeToAction(
    actionType: TActionType,
    callback: (state: TState) => void
  ) {
    if (!this.subscribers[actionType as keyof typeof this.subscribers]) {
      this.subscribers[actionType as keyof typeof this.subscribers] = [];
    }

    this.subscribers[actionType]?.push(callback);
  }

  abstract dispatch(action: { type: TActionType; payload?: any }): void;
}

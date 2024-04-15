import Store from "../shared/service/store";

export enum TodoActions {
  INIT = "INIT",
  ADD_TODO = "ADD_TODO",
  DELETE_TODO = "DELETE_TODO",
}

export interface ITodoState {
  todos: string[];
}

export default class TodoStore extends Store<ITodoState, TodoActions> {
  protected state: ITodoState = {
    todos: [],
  };

  public dispatch(action: { type: TodoActions; payload?: any }): void {
    switch (action.type) {
      case TodoActions.ADD_TODO: {
        const { todos } = this.state;
        const newTodos = [...todos, action.payload];
        this.setState({ todos: newTodos });
        break;
      }
      case TodoActions.DELETE_TODO: {
        const { todos } = this.state;
        const newTodos = todos.filter((todo) => todo !== action.payload);
        this.setState({ todos: newTodos });
        break;
      }
      case TodoActions.INIT: {
        this.setState({ todos: action.payload });
        break;
      }
    }

    this.subscribers[action.type]?.forEach((subscriber) => {
      subscriber(this.state);
    });
  }
}

export const todoStore = new TodoStore();

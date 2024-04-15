import { container, singleton } from "tsyringe";
import { BaseElement } from "../shared/helpers/BaseElement";
import TodoService from "./Todo.service";
import { TodoActions } from "./Todo.state";
import Form from "./form/Form";
import TodoList from "./todoList/TodoList";
import { InjectionToken } from "../common/injectionTokens";

export class Todo extends BaseElement<HTMLDivElement> {
  private todoService: TodoService;
  private readonly todoStore = container.resolve(InjectionToken.TODO_STORE);

  constructor() {
    super({ tag: "div", class: "todo" });

    this.todoService = new TodoService();
    this.init();
  }

  private init() {
    this.todoService.load().then((todos) => {
      this.todoStore.dispatch({ type: TodoActions.INIT, payload: todos });
    });

    this.todoStore.subscribeToAction(TodoActions.INIT, (state) => {
      this.draw(state.todos);
    });

    this.todoStore.subscribeToAction(TodoActions.ADD_TODO, (state) => {
      this.draw(state.todos);
    });
  }

  private draw(todos: string[]) {
    const link = new BaseElement({
      tag: "a",
      text: "Home",
      attributes: { href: "/home" },
    });

    const form = new Form({
      onSubmit: (value: string) => {
        const todosFromState = this.todoStore.getState("todos");
        todosFromState.push(value);

        this.todoService.save(todosFromState).then(() => {
          this.todoStore.dispatch({
            type: TodoActions.ADD_TODO,
            payload: value,
          });
        });
      },
    });

    const todoList = new TodoList({
      onDelete: (id: string) => {
        console.log(id);
        // state.todos = state.todos.filter((todo) => todo !== id);
      },
    });

    todoList.draw(todos);

    this.append(link.node, form.node, todoList.node);
  }
}

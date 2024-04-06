import { BaseElement } from "../shared/helpers/BaseElement";
import StorageService from "../shared/service/storage";
import TodoService from "./Todo.service";
import { TodoActions, todoStore } from "./Todo.state";
import Form from "./form/Form";
import TodoList from "./todoList/TodoList";

export class Todo extends BaseElement<HTMLDivElement> {
  private todoService: TodoService;
  private todoStore = todoStore;

  constructor(storage: StorageService) {
    super({ tag: "div", class: "todo" });

    this.todoService = new TodoService(storage);
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

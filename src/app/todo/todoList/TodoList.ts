import { BaseElement } from "../../shared/helpers/BaseElement";
import TodoItemComponent from "./todoItem/TodoItem";

export default class TodoList extends BaseElement<HTMLUListElement> {
  constructor(private props: { onDelete: (id: string) => void }) {
    super({ tag: "ul", class: "todo-list" });
  }

  public draw(todos: string[]) {
    const todosItems = todos.map((todo) => {
      const todoItem = new TodoItemComponent({
        id: todo,
        text: todo,
        onDelete: this.props.onDelete,
      });

      return todoItem.node;
    });

    this.appendInner(...todosItems);
  }
}

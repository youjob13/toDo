import ButtonComponent from "../../../shared/components/ButtonComponent";
import { BaseElement } from "../../../shared/helpers/BaseElement";

export default class TodoItemComponent extends BaseElement<HTMLLIElement> {
  constructor(
    private props: { id: string; text: string; onDelete: (id: string) => void }
  ) {
    super({ tag: "li", class: "todo-item" });

    this.draw();
  }

  private draw() {
    const { text, onDelete, id } = this.props;

    const textNode = new BaseElement<HTMLSpanElement>({
      tag: "span",
      text,
    });

    const deleteButton = new ButtonComponent({
      text: "Delete",
      onClick: () => {
        onDelete(id);
        this.node.remove();
      },
    });

    this.append(textNode.node, deleteButton.node);
  }
}

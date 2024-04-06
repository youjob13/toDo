import ButtonComponent from "../../shared/components/ButtonComponent";
import InputComponent from "../../shared/components/InputComponent";
import { BaseElement } from "../../shared/helpers/BaseElement";

export default class Form extends BaseElement<HTMLFormElement> {
  constructor(private props: { onSubmit: (event: string) => void }) {
    super({ tag: "form", class: "todo-form" });
    this.draw();
  }

  private draw() {
    const input = new InputComponent({
      placeholder: "Enter todo",
      onInput: (event) => {},
    });

    const button = new ButtonComponent({
      text: "Add",
      onClick: () => {
        this.props.onSubmit(input.node.value);
      },
    });

    this.appendInner(input.node, button.node);
  }
}

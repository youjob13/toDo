import { BaseElement, IBaseParams } from "../helpers/BaseElement";

export interface IInputParameters extends Omit<IBaseParams, "tag"> {
  placeholder: string;
  value?: string;
  onInput: (event: Event) => void;
}

export default class InputComponent extends BaseElement<HTMLInputElement> {
  constructor(private inputParams: IInputParameters) {
    super({ ...inputParams, tag: "input" });

    this.node.placeholder = inputParams.placeholder;
    this.addListener();
  }

  private addListener() {
    const { onInput } = this.inputParams;

    this.node.addEventListener("input", (event) => {
      onInput(event);
    });
  }

  public reset() {
    this.node.value = "";
  }
}

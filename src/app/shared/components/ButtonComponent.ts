import { BaseElement, IBaseParams } from "../helpers/BaseElement";

interface IButtonParameters extends Omit<IBaseParams, "tag"> {
  eventType?: string;
  onClick: (args: Event) => void;
}

export default class ButtonComponent extends BaseElement<HTMLButtonElement> {
  constructor(protected buttonParams: IButtonParameters) {
    super({ ...buttonParams, tag: "button" });
    this.addListener();
  }

  private addListener() {
    const { eventType = "click", onClick } = this.buttonParams;

    this.node.addEventListener(eventType, (event) => {
      event.preventDefault();
      onClick(event);
    });
  }
}

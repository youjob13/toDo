export interface IBaseParams {
  tag: string;
  text?: string;
  class?: string;
  id?: string;
  attributes?: { [key: string]: string };
}

export class BaseElement<TTag extends HTMLElement> {
  public readonly node: TTag;

  constructor(private params: IBaseParams) {
    this.node = this.create();
  }

  private create() {
    const { tag, text, class: className, id, attributes } = this.params;
    const element = document.createElement(tag);

    if (className) {
      element.className = className;
    }

    if (text) {
      element.textContent = text;
    }

    if (attributes) {
      Object.keys(attributes).forEach((key) => {
        element.setAttribute(key, attributes[key]);
      });
    }

    return element as TTag;
  }

  public append(...childNodes: HTMLElement[]) {
    this.node.innerHTML = "";
    this.appendInner(...childNodes);
  }

  public appendInner(...childNodes: HTMLElement[]) {
    this.node.append(...childNodes);
  }
}

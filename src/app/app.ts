import { BaseElement } from "./shared/helpers/BaseElement";
import Router from "./shared/service/router";
import StorageService from "./shared/service/storage";
import { Todo } from "./todo/Todo";

export default class App {
  private entryPoint: HTMLElement;

  constructor(storage: StorageService, private router: Router) {
    this.entryPoint = document.body;

    this.router.initRouter([
      {
        route: "/todo",
        callback: () => {
          this.render(new Todo(storage).node);
        },
      },
      {
        route: "/home",
        callback: () => {
          const homePage = new BaseElement({
            tag: "div",
            class: "home",
            text: "Home",
          });

          const link = new BaseElement({
            tag: "a",
            text: "Todo",
            attributes: { href: "/todo" },
          });

          homePage.append(link.node);
          this.render(homePage.node);
        },
        isDefaultRoute: true,
      },
    ]);
  }

  private render(page: HTMLElement) {
    this.entryPoint.innerHTML = "";
    this.entryPoint.append(page);
  }
}

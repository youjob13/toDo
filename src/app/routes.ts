import { BaseElement } from "./shared/helpers/BaseElement";
import { Route } from "./shared/service/router";
import { Todo } from "./todo/Todo";

export const routes: Route[] = [
  {
    route: "/todo",
    callback: () => {
      return new Todo().node;
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
      return homePage.node;
    },
    isDefaultRoute: true,
  },
];

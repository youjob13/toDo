import { routes } from "./routes";
import Router from "./shared/service/router";

export default class App {
  private entryPoint: HTMLElement;

  constructor(private router: Router) {
    this.entryPoint = document.body;

    this.router.initRouter(routes, (page: HTMLElement) => {
      this.render(page);
    });
  }

  private render(page: HTMLElement) {
    this.entryPoint.innerHTML = "";
    this.entryPoint.append(page);
  }
}

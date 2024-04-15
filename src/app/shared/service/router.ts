export type Route = {
  route: string;
  callback: () => HTMLElement;
  isDefaultRoute?: boolean;
};

export default class Router {
  private routes: Record<Route["route"], Route["callback"]> = {};

  constructor() {
    document.addEventListener("click", (event) => {
      const { target } = event as unknown as { target: HTMLAnchorElement };
      if (!target.matches("a")) {
        return;
      }
      event.preventDefault();
      this.navigateTo(target.href);
    });
  }

  private navigateTo(url: string) {
    window.history.pushState({}, "", url);
    window.dispatchEvent(new PopStateEvent("popstate", {}));
  }

  public initRouter(routes: Route[], notifier: (page: HTMLElement) => void) {
    this.addRoutes(routes);

    window.addEventListener("popstate", this.changePage.bind(this, notifier));

    this.changePage(notifier);
  }

  private addRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.addRoute(route);
    });
  }

  public addRoute({ route, callback, isDefaultRoute }: Route) {
    this.routes[route] = callback;
    if (isDefaultRoute) {
      this.routes["/"] = callback;
    }
  }

  private changePage(notifier: (page: HTMLElement) => void) {
    const path = window.location.pathname;
    if (this.routes[path]) {
      notifier(this.routes[path]());
    }
  }
}

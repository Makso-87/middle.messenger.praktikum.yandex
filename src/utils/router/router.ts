import { Route } from '../route/route';
import Block from '../block/block';
import { authenticationControl } from '../authenticationControl/authenticationControl';

class Router {
  static __instance: InstanceType<unknown>;

  _rootQuery: string;

  _currentRoute: Route | null;

  routes: Route[];

  history: History;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: Block, props: unknown): this {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery, blockProps: props });
    this.routes.push(route);
    return this;
  }

  start(): void {
    window.onpopstate = (event: PopStateEvent) => {
      this._onRoute((event.target as Window).location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
    this._onRouteExecute();
  }

  go(pathname: string): void {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  set onRouteExecute(callback: () => void) {
    this._onRouteExecute = callback;
  }

  _onRouteExecute() {}

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }
}
const router = new Router('.app');
router.onRouteExecute = () => authenticationControl();
export default router;

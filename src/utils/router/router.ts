class Block {
  private data: any;

  getContent() {
    return this.data;
  }

  show() {
  }

  hide() {
  }
}

function isEqual(lhs: any, rhs: any) {
  return lhs === rhs;
}

function render(query: string, block: { getContent: () => string; }) {
  const root = document.querySelector(query);
  // root.innerHTML = ''
  // root.appendChild(block.getContent());
  if (root) {
    root.innerHTML = block.getContent();
    return root;
  }
}

class Route {
  private _pathname: string;

  private _blockClass: any;

  private _block: any;

  private _props: { [k: string]: string; };

  constructor(pathname: string, view: any, props: { [k: string]: string; }) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    this._block = new this._blockClass();
    render(this._props.rootQuery, this._block);
    const location = this._pathname;
    if (location === '/') {
      // @ts-ignore
      import('../../pages/pageJS/login.js');
    } else if (location === '/signup') {
      // @ts-ignore
      import('../../pages/pageJS/registration.js');
    } else if (location === '/chat') {
      // @ts-ignore
      import('../../pages/pageJS/chat.js');
    } else if (location === '/profile') {
      // @ts-ignore
      import('../../pages/pageJS/profile.js');
    } else if (location === '/profile_changes') {
      // @ts-ignore
      import('../../pages/pageJS/profile_changes.js');
    } else if (location === '/profile_change_psw') {
      // @ts-ignore
      import('../../pages/pageJS/profile_change_psw.js');
    }
  }
}

class Router {
  private static __instance: any;

  private _currentRoute: any;

  private _rootQuery: string;

  private history: History;

  private routes: any[];

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

  use(pathname: string, block: any) {
    const route = new Route(pathname, block, {rootQuery: this._rootQuery});
    this.routes.push(route);
    return this;
  }

  start() {
    // Реагируем на изменения в адресной строке и вызываем перерисовку
    // this.history.pushState({}, "", window.location.pathname);
    window.onpopstate = (event: any) => {
      // this.history.pushState({}, "", event.currentTarget.location.pathname); хотел добавить, потому что при инициализации первой стрпаницы не попадает в попстейт ничего
      this._onRoute(event.currentTarget.location.pathname);
    };
    // this.history.pushState({}, "", window.location.pathname); //тоже самое, когда оба папстейта есть то не работает кнопка вперед
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (route) {
      if (this._currentRoute) {
        this._currentRoute.leave();
      }
      this._currentRoute = route;
      route.render(route, pathname);
    } else {
      const pathname = '/404';
      const routeError = this.getRoute(pathname);
      routeError.render(routeError, pathname);
    }
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

const router = new Router('.block-wrapper');

export { router, Block };

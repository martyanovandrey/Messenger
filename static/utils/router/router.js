class Block {
    getContent() {
        return this.data;
    }
    show() {
        //this.getContent().style.display = "block";
    }
    hide() {
        //this.getContent().style.display = "none";
    }
}
function isEqual(lhs, rhs) {
    return lhs === rhs;
}
function render(query, block) {
    const root = document.querySelector(query);
    //root.innerHTML = ''
    //root.appendChild(block.getContent());
    root.innerHTML = block.getContent();
    return root;
}
class Route {
    constructor(pathname, view, props) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }
    navigate(pathname) {
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
    match(pathname) {
        return isEqual(pathname, this._pathname);
    }
    render() {
        if (!this._block) {
            this._block = new this._blockClass();
            render(this._props.rootQuery, this._block);
            let location = this._pathname;
            if (location === "/") {
                import('../../pages/pageJS/login.js');
            }
            else if (location === "/signup") {
                import('../../pages/pageJS/registration.js');
            }
            else if (location === "/chat") {
                import('../../pages/pageJS/chat.js');
            }
            else if (location === "/profile") {
                import('../../pages/pageJS/profile.js');
            }
            else if (location === "/profile_changes") {
                import('../../pages/pageJS/profile_changes.js');
            }
            else if (location === "/profile_change_psw") {
                import('../../pages/pageJS/profile_change_psw.js');
            }
            else if (location === "/chat_dialog") {
                import('../../pages/pageJS/chat_dialog.js');
            }
            return;
        }
        this._block.show();
    }
}
class Router {
    constructor(rootQuery) {
        if (Router.__instance) {
            return Router.__instance;
        }
        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
        Router.__instance = this;
    }
    use(pathname, block) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });
        this.routes.push(route);
        return this;
    }
    start() {
        // Реагируем на изменения в адресной строке и вызываем перерисовку
        //this.history.pushState({}, "", window.location.pathname);
        window.onpopstate = event => {
            //this.history.pushState({}, "", event.currentTarget.location.pathname); хотел добавить, потому что при инициализации первой стрпаницы не попадает в попстейт ничего
            this._onRoute(event.currentTarget.location.pathname);
        };
        //this.history.pushState({}, "", window.location.pathname); //тоже самое, когда оба папстейта есть то не работает кнопка вперед
        this._onRoute(window.location.pathname);
    }
    _onRoute(pathname) {
        const route = this.getRoute(pathname);
        if (this._currentRoute) {
            this._currentRoute.leave();
        }
        this._currentRoute = route;
        route.render(route, pathname);
    }
    go(pathname) {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }
    back() {
        this.history.back();
        /*        let thisPathname = window.location.pathname
                let thisBlock = this.getRoute(thisPathname)
                thisBlock.navigate(thisPathname)*/
    }
    forward() {
        this.history.forward();
        /*        let thisPathname = window.location.pathname
                let thisBlock = this.getRoute(thisPathname)
                thisBlock.navigate(thisPathname)*/
    }
    getRoute(pathname) {
        return this.routes.find(route => route.match(pathname));
    }
}
// Необходимо оставить в силу особенностей тренажёра
//history.pushState({}, '', '/');
export { Router, Block };
//const router = new Router(".app");
/*
// Можно обновиться на /user и получить сразу пользователя
router
    .use("/", Chats)
    .use("/users", Users)
    .start();

// Через секунду контент изменится сам, достаточно дёрнуть переход
setTimeout(() => {
    router.go("/users");
}, 1000);

// А можно и назад
setTimeout(() => {
    router.back();
}, 3000);

// И снова вперёд
setTimeout(() => {
    router.forward();
}, 5000);*/
//# sourceMappingURL=router.js.map
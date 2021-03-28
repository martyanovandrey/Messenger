"use strict";
exports.__esModule = true;
exports.Block = exports.router = void 0;
var Block = /** @class */ (function () {
    function Block() {
    }
    Block.prototype.getContent = function () {
        return this.data;
    };
    Block.prototype.show = function () {
        //this.getContent().style.display = "block";
    };
    Block.prototype.hide = function () {
        //this.getContent().style.display = "none";
    };
    return Block;
}());
exports.Block = Block;
function isEqual(lhs, rhs) {
    return lhs === rhs;
}
function render(query, block) {
    var root = document.querySelector(query);
    //root.innerHTML = ''
    //root.appendChild(block.getContent());
    root.innerHTML = block.getContent();
    return root;
}
var Route = /** @class */ (function () {
    function Route(pathname, view, props) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }
    Route.prototype.navigate = function (pathname) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    };
    Route.prototype.leave = function () {
        if (this._block) {
            this._block.hide();
        }
    };
    Route.prototype.match = function (pathname) {
        return isEqual(pathname, this._pathname);
    };
    Route.prototype.render = function () {
        if (!this._block) {
            this._block = new this._blockClass();
            render(this._props.rootQuery, this._block);
            var location_1 = this._pathname;
            if (location_1 === "/") {
                Promise.resolve().then(function () { return require('../../pages/pageJS/login.js'); });
            }
            else if (location_1 === "/signup") {
                Promise.resolve().then(function () { return require('../../pages/pageJS/registration.js'); });
            }
            else if (location_1 === "/chat") {
                Promise.resolve().then(function () { return require('../../pages/pageJS/chat.js'); });
            }
            else if (location_1 === "/profile") {
                Promise.resolve().then(function () { return require('../../pages/pageJS/profile.js'); });
            }
            else if (location_1 === "/profile_changes") {
                Promise.resolve().then(function () { return require('../../pages/pageJS/profile_changes.js'); });
            }
            else if (location_1 === "/profile_change_psw") {
                Promise.resolve().then(function () { return require('../../pages/pageJS/profile_change_psw.js'); });
            }
            return;
        }
        this._block.show();
    };
    return Route;
}());
var Router = /** @class */ (function () {
    function Router(rootQuery) {
        if (Router.__instance) {
            return Router.__instance;
        }
        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
        Router.__instance = this;
    }
    Router.prototype.use = function (pathname, block) {
        var route = new Route(pathname, block, { rootQuery: this._rootQuery });
        this.routes.push(route);
        return this;
    };
    Router.prototype.start = function () {
        var _this = this;
        // Реагируем на изменения в адресной строке и вызываем перерисовку
        //this.history.pushState({}, "", window.location.pathname);
        window.onpopstate = function (event) {
            //this.history.pushState({}, "", event.currentTarget.location.pathname); хотел добавить, потому что при инициализации первой стрпаницы не попадает в попстейт ничего
            _this._onRoute(event.currentTarget.location.pathname);
        };
        //this.history.pushState({}, "", window.location.pathname); //тоже самое, когда оба папстейта есть то не работает кнопка вперед
        this._onRoute(window.location.pathname);
    };
    Router.prototype._onRoute = function (pathname) {
        var route = this.getRoute(pathname);
        if (this._currentRoute) {
            this._currentRoute.leave();
        }
        this._currentRoute = route;
        route.render(route, pathname);
    };
    Router.prototype.go = function (pathname) {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    };
    Router.prototype.back = function () {
        this.history.back();
    };
    Router.prototype.forward = function () {
        this.history.forward();
    };
    Router.prototype.getRoute = function (pathname) {
        return this.routes.find(function (route) { return route.match(pathname); });
    };
    return Router;
}());
var router = new Router('.block-wrapper');
exports.router = router;

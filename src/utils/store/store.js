"use strict";
exports.__esModule = true;
exports.store = void 0;
var cloneDeep_js_1 = require("../cloneDeep/cloneDeep.js");
function updateState(state, action) {
    if (action.type === 'CHANGEDATA') {
        console.log('IM CHANGEDATA');
        var objects = [state, action.data];
        return cloneDeep_js_1["default"](objects);
    }
}
var Store = /** @class */ (function () {
    function Store(updateState, state) {
        this._updateState = updateState;
        this._state = state;
        this._callbacks = [];
    }
    Object.defineProperty(Store.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: false,
        configurable: true
    });
    Store.prototype.update = function (action) {
        this._state = this._updateState(this._state, action);
        this._callbacks.forEach(function (callback) { return callback(); });
    };
    Store.prototype.subscribe = function (callback) {
        var _this = this;
        this._callbacks.push(callback);
        return function () { return _this._callbacks = _this._callbacks.filter(function (cb) { return cb !== callback; }); };
    };
    return Store;
}());
var initialstate = {
    id: '1',
    first_name: "User",
    second_name: "test",
    display_name: "test",
    login: "test",
    email: "test",
    password: "test",
    phone: "test",
    userMessage: "Wuzzzuuuuuup",
    myMessage: "Wuzzzuuuuuuuuuuuuuuuuuuuup"
};
exports.store = new Store(updateState, initialstate);

"use strict";
exports.__esModule = true;
exports.BaseAPI = void 0;
// base-api.js
var BaseAPI = /** @class */ (function () {
    function BaseAPI() {
    }
    // Абстрактным не делаю все методы, потому что не все их реализую
    BaseAPI.prototype.create = function () { throw new Error('Not implemented'); };
    BaseAPI.prototype.request = function () { throw new Error('Not implemented'); };
    BaseAPI.prototype.update = function () { throw new Error('Not implemented'); };
    BaseAPI.prototype["delete"] = function () { throw new Error('Not implemented'); };
    return BaseAPI;
}());
exports.BaseAPI = BaseAPI;

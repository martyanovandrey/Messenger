"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.METHOD = exports.queryString = exports.HTTPTransport = void 0;
var queryString_js_1 = require("../queryString/queryString.js");
exports.queryString = queryString_js_1.queryString;
var METHOD;
(function (METHOD) {
    METHOD["GET"] = "GET";
    METHOD["POST"] = "POST";
    METHOD["PUT"] = "PUT";
    METHOD["DELETE"] = "DELETE";
})(METHOD || (METHOD = {}));
exports.METHOD = METHOD;
;
var HTTPTransport = /** @class */ (function () {
    function HTTPTransport(baseUrl) {
        var _this = this;
        this.get = function (url, options) {
            if (options === void 0) { options = {}; }
            options.data = queryString_js_1.queryString(options.data);
            url = url + '/' + options.data;
            return _this.request(_this.baseUrl + url, __assign(__assign({}, options), { method: METHOD.GET }));
        };
        this.post = function (url, options) {
            if (options === void 0) { options = {}; }
            return _this.request(_this.baseUrl + url, __assign(__assign({}, options), { method: METHOD.POST }));
        };
        this.put = function (url, options) {
            if (options === void 0) { options = {}; }
            console.log((_this.baseUrl + url), 'URL TEST !!');
            return _this.request(_this.baseUrl + url, __assign(__assign({}, options), { method: METHOD.PUT }));
        };
        this["delete"] = function (url, options) {
            if (options === void 0) { options = {}; }
            return _this.request(_this.baseUrl + url, __assign(__assign({}, options), { method: METHOD.DELETE }));
        };
        this.baseUrl = baseUrl;
    }
    HTTPTransport.prototype.request = function (url, options) {
        if (options === void 0) { options = { method: METHOD.GET }; }
        var method = options.method, data = options.data, headers = options.headers;
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.setRequestHeader(Object.keys(headers)[0], Object.values(headers)[0]);
            xhr.withCredentials = true;
            xhr.onload = function () {
                resolve(xhr);
            };
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;
            console.log(data);
            if (method === METHOD.GET || !data) {
                xhr.send();
            }
            else {
                xhr.send(data);
            }
        });
    };
    ;
    return HTTPTransport;
}());
exports.HTTPTransport = HTTPTransport;

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.SignupAPI = exports.SigninAPI = void 0;
// chat-api.js
var xhr_js_1 = require("../utils/xhr/xhr.js");
var base_api_js_1 = require("./base-api.js");
console.log('im loadded');
var options = {
    headers: {
        'Content-Type': 'application/json'
    }
};
var signinAPIInstance = new xhr_js_1.HTTPTransport('/api/v1/auth');
var SigninAPI = /** @class */ (function (_super) {
    __extends(SigninAPI, _super);
    function SigninAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SigninAPI.prototype.create = function (data) {
        return signinAPIInstance.post('/signin', __assign(__assign({}, options), { data: data }));
    };
    SigninAPI.prototype.request = function () {
        return signinAPIInstance.get('/signin', __assign({}, options));
    };
    return SigninAPI;
}(base_api_js_1.BaseAPI));
exports.SigninAPI = SigninAPI;
var signupAPIInstance = new xhr_js_1.HTTPTransport('/api/v1/auth');
var SignupAPI = /** @class */ (function (_super) {
    __extends(SignupAPI, _super);
    function SignupAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SignupAPI.prototype.create = function (data) {
        return signupAPIInstance.post('/signup', __assign(__assign({}, options), { data: data }));
    };
    SignupAPI.prototype.request = function () {
        return signupAPIInstance.get('/signup', __assign({}, options));
    };
    return SignupAPI;
}(base_api_js_1.BaseAPI));
exports.SignupAPI = SignupAPI;

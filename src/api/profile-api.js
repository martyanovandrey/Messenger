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
exports.ProfileChangePswAPI = exports.ProfileChangeAPI = exports.ProfileAPI = void 0;
var xhr_js_1 = require("../utils/xhr/xhr.js");
var base_api_js_1 = require("./base-api.js");
var options = {
    headers: {
        'Content-Type': 'application/json'
    }
};
var profileAPIInstance = new xhr_js_1.HTTPTransport('/api/v1/user');
var ProfileAPI = /** @class */ (function (_super) {
    __extends(ProfileAPI, _super);
    function ProfileAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProfileAPI.prototype.update = function (data) {
        return profileAPIInstance.put('/profile', __assign(__assign({}, options), { data: data }));
    };
    return ProfileAPI;
}(base_api_js_1.BaseAPI));
exports.ProfileAPI = ProfileAPI;
var profileChange = new xhr_js_1.HTTPTransport('/api/v1/user');
var ProfileChangeAPI = /** @class */ (function (_super) {
    __extends(ProfileChangeAPI, _super);
    function ProfileChangeAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProfileChangeAPI.prototype.update = function (data) {
        return profileChange.put('/profile/change', __assign(__assign({}, options), { data: data }));
    };
    return ProfileChangeAPI;
}(base_api_js_1.BaseAPI));
exports.ProfileChangeAPI = ProfileChangeAPI;
var profileChangePsw = new xhr_js_1.HTTPTransport();
var ProfileChangePswAPI = /** @class */ (function (_super) {
    __extends(ProfileChangePswAPI, _super);
    function ProfileChangePswAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProfileChangePswAPI.prototype.update = function (data) {
        return profileChangePsw.put('/password/change', __assign(__assign({}, options), { data: data }));
    };
    return ProfileChangePswAPI;
}(base_api_js_1.BaseAPI));
exports.ProfileChangePswAPI = ProfileChangePswAPI;

"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
var input_validation_js_1 = require("../../utils/input_validation/input_validation.js");
var router_js_1 = require("../../utils/router/router.js");
document.querySelector(".profile-sidebar").addEventListener("click", function (event) {
    event.preventDefault();
    router_js_1.router.go("/chat");
});
document.querySelector("#change_data").addEventListener("click", function (event) {
    event.preventDefault();
    router_js_1.router.go("/profile_changes");
});
document.querySelector("#change_psw").addEventListener("click", function (event) {
    event.preventDefault();
    router_js_1.router.go("/profile_change_psw");
});
document.querySelector("#logout").addEventListener("click", function (event) {
    event.preventDefault();
    router_js_1.router.go("/");
});
var node_inputs = document.querySelectorAll('.textinput-profile.right');
var input_select = __spreadArray([], node_inputs);
input_select.map(function (el) {
    var input_span = el.parentElement;
    var error_label = input_span.querySelector('.registration__invalid');
    el.addEventListener("focus", function () {
        el.style.background = "";
    });
    el.addEventListener("blur", function () {
        if (input_validation_js_1["default"](el)) {
            el.style.background = "";
        }
        else {
            if (el.value === "") {
                el.style.background = "";
            }
            else {
                el.style.background = "#ffe9ec";
                error_label.textContent = "" + el.dataset.message;
                error_label.style.textAlign = "right";
                error_label.style.width = '350px';
                console.log(error_label === null || error_label === void 0 ? void 0 : error_label.textContent);
                error_label.style.visibility = "visible";
            }
        }
    });
});

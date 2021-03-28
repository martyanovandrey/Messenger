"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
var button_js_1 = require("../../components/button/button.js");
var input_validation_js_1 = require("../../utils/input_validation/input_validation.js");
var signin_api_js_1 = require("../../api/signin-api.js");
var router_js_1 = require("../../utils/router/router.js");
document.querySelector(".not-registered-text").addEventListener("click", function (event) {
    event.preventDefault();
    router_js_1.router.go("/signup");
});
//Validate data
var node_inputs = document.querySelectorAll('.textinput-control');
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
                error_label.style.visibility = "visible";
            }
        }
    });
});
//Create button
var button = new button_js_1.Button({
    text: 'Авторизоваться'
});
button_js_1.render(".app", button);
var button_div = document.querySelector('.app');
var button_div_b = button_div.firstElementChild;
button_div_b.classList.add("button_type_submit");
button_div_b.type = 'submit';
var button_span = button_div_b.firstElementChild;
button_span.classList.add("button-text");
document.querySelector(".button_type_submit").addEventListener("click", function login(event) {
    console.log('bbbbb');
    event.preventDefault();
    var form = document.querySelector('form');
    var formData = new FormData(form);
    var data = {};
    formData.forEach(function (value, key) { data[key] = value; });
    var data_json = JSON.stringify(data);
    input_select.find(function (el) {
        if (!(input_validation_js_1["default"](el))) {
            console.log(el.placeholder + " not valid");
        }
    });
    var signinApiClient = new signin_api_js_1.SigninAPI();
    signinApiClient.create(JSON.stringify(data)).then(function (data) {
        console.log('WHAT I GET ');
        console.log(data);
        router_js_1.router.go("/chat");
    });
});

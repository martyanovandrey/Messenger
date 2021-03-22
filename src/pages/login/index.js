"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var button_js_1 = require("../../components/button/button.js");
var input_validation_js_1 = require("../../utils/input_validation/input_validation.js");
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector(".button_type_submit").addEventListener("click", login);
});
function login() {
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
    console.log(data_json);
}
//Validate data
var node_inputs = document.querySelectorAll('.textinput-control');
var input_select = __spreadArrays(node_inputs);
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

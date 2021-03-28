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
exports.__esModule = true;
exports.render = exports.Button = void 0;
var block_js_1 = require("../../utils/block/block.js");
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button(props) {
        return _super.call(this, "button", props) || this;
    }
    Button.prototype.render = function () {
        return "<span>" + this.props.text + "</span>";
    };
    return Button;
}(block_js_1["default"]));
exports.Button = Button;
function render(query, block) {
    var root = document.querySelector(query);
    console.log(block.getContent());
    root.appendChild(block.getContent());
    return root;
}
exports.render = render;

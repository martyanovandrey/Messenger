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
exports.render = exports.ChatList = void 0;
var block_js_1 = require("../../utils/block/block.js");
var pug = require('pug');
var ChatList = /** @class */ (function (_super) {
    __extends(ChatList, _super);
    function ChatList(props) {
        return _super.call(this, "div", props) || this;
    }
    ChatList.prototype.render = function () {
        var pugData = "\nul.chat-list\n    each user in users\n        li.chat-list__element(data-name= user.name)\n            div.chat_link\n                .chat_image(data-action='chatListEvent')\n                    img(src='../../data/circle.png' alt='')\n                .chat_text_wrap(data-action='chatListEvent')\n                    .chat_text_name\n                        span= user.name\n                    .chat_text_message\n                        span= user.text\n                .chat_meta_wrap(data-action='chatListEvent')\n                    time.chat_meta_date= user.date\n                    if (user.badge)\n                        span.chat_meta_badge= user.badge\n";
        var compiledFunction = pug.compile(pugData);
        var doneHTML = compiledFunction(this.props);
        return doneHTML;
    };
    return ChatList;
}(block_js_1["default"]));
exports.ChatList = ChatList;
function render(query, block) {
    var root = document.querySelector(query);
    root.appendChild(block.getContent().firstChild);
    return root;
}
exports.render = render;

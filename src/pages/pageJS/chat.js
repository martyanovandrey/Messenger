"use strict";
exports.__esModule = true;
var chatMembers_js_1 = require("../../components/chatMembers/chatMembers.js");
var chatList_js_1 = require("../../components/chatList/chatList.js");
var router_js_1 = require("../../utils/router/router.js");
document.querySelector(".search__profile").addEventListener("click", function (event) {
    event.preventDefault();
    router_js_1.router.go("/profile");
});
var chatProps = [{
        id: '1',
        name: 'User',
        text: 'Hello!',
        date: '13:37',
        badge: '4'
    }, {
        id: '2',
        name: 'Teeeeeest',
        text: 'Hi!',
        date: '13:37'
    }];
var chatList = new chatList_js_1.ChatList({ title: 'chatProps', users: chatProps });
chatList_js_1.render(".page_chat_list", chatList);
var chatListUsersUpdate = ['User'];
var chats = document.querySelectorAll('.chat-list__element');
chats.forEach(function (el) {
    el.addEventListener("click", openChatDialog);
    function openChatDialog() {
        var chatUsers = this.dataset.name;
        if (chatListUsersUpdate[0] === chatUsers) {
            console.log('same');
        }
        else {
            chatListUsersUpdate = [];
            chatListUsersUpdate.push(chatUsers);
        }
        var blankMessage = document.querySelector('.dialog-text.dialog-mask');
        var pageDialog = document.querySelector('.page-dialog');
        if (blankMessage) {
            blankMessage.remove();
        }
        else {
            pageDialog.innerHTML = '';
        }
        var chatMembers = new chatMembers_js_1.ChatMembers({ title: 'chatProps', chatMembers: chatListUsersUpdate });
        chatList_js_1.render(".page-dialog", chatMembers);
        var headMenu = document.getElementById('headMenu');
        new Menu(headMenu);
    }
});
var Menu = /** @class */ (function () {
    function Menu(elem) {
        console.log(elem);
        elem.onclick = this.onClick.bind(this); // (*)
    }
    Menu.prototype.menu = function (event) {
        var menuPopup = document.querySelector('.page-dialog__pop-up.user-menu');
        if (menuPopup) {
            if (!menuPopup.hidden) {
                menuPopup.style.left = (event.clientX - menuPopup.offsetWidth) + 'px';
            }
            menuPopup.hidden = !menuPopup.hidden;
        }
        else {
            console.log('menuPopup not found on page');
        }
    };
    Menu.prototype.menuAdd = function (event) {
        var menuAddPopup = document.getElementById('addMenu');
        if (menuAddPopup) {
            if (!menuAddPopup.hidden) {
                menuAddPopup.style.left = (event.clientX - menuAddPopup.offsetWidth) + 'px';
            }
            menuAddPopup.hidden = !menuAddPopup.hidden;
        }
        else {
            console.log('menuAddPopup not found on page');
        }
    };
    Menu.prototype.addUser = function () {
        var addUserMenu = document.getElementById('addUserMenu');
        if (addUserMenu) {
            chatListUsersUpdate.push(addUserMenu.value);
            addUserMenu.hidden;
            //chatMembers.setProps({title: 'chatProps', chatMembers: chatListUsersUpdate});
        }
        else {
            console.log('addUserMenu not found on page');
        }
    };
    Menu.prototype.menuDelete = function (event) {
        var menuDeletePopup = document.getElementById('deleteMenu');
        if (menuDeletePopup) {
            if (!menuDeletePopup.hidden) {
                menuDeletePopup.style.left = (event.clientX - menuDeletePopup.offsetWidth) + 'px';
            }
            menuDeletePopup.hidden = !menuDeletePopup.hidden;
        }
        else {
            console.log('menuDeletePopup not found on page');
        }
    };
    Menu.prototype.attach = function () {
        var menuAttachPopup = document.querySelector('.page-dialog__pop-up.photo-file-menu');
        if (menuAttachPopup) {
            menuAttachPopup.hidden = !menuAttachPopup.hidden;
        }
        else {
            console.log('menuAttachPopup not found on page');
        }
    };
    Menu.prototype.onClick = function (event) {
        if (event.target instanceof HTMLElement) {
            var action = event.target.dataset.action;
            console.log(event.target.closest('button'));
            console.log(event);
            console.log(action);
            if (action) {
                this[action](event);
            }
        }
    };
    ;
    return Menu;
}());

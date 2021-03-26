import { ChatMembers } from '../../components/chatMembers/chatMembers.js';
import { ChatList, render } from '../../components/chatList/chatList.js';
const pug = require('pug');
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector(".button").addEventListener("click", popup);
});
document.querySelector(".search__profile").addEventListener("click", event => {
    event.preventDefault();
    router.go("/profile");
});
/*(<HTMLButtonElement>document.getElementById("1")).addEventListener("click", event => {
    event.preventDefault()
    router.go("/chat_dialog");
});*/
let chats = document.querySelectorAll('.chat-list__element');
chats.forEach((el) => {
    el.addEventListener("click", function test(id) { chat(this.id); });
});
//(<HTMLButtonElement>document.querySelector(".chat_link")).addEventListener("click", chat(this.id));
function chat(id) {
    //let userName = document.getElementById('1');
    let data = { id: id };
    sendData(data);
}
//Send req
/*function sendData(data){

    let chatPage = new ChatAPI()
    chatPage.create(JSON.stringify(data)).then(function(data) {
        console.log('WHAT I GET ');
        console.log(data);
        let textBlock = document.querySelector('.dialog-text.dialog-mask')
        if (textBlock === null){
            console.log("test");
            textBlock = document.querySelector('.page-dialog__wrap')
        }
        textBlock.style.display = "none"
        let dialogBlock = document.querySelector('.page-dialog')
        dialogBlock.innerHTML = data.response
    });
}*/
//(<HTMLButtonElement>document.querySelector(".button.button_send")).addEventListener("click", message);
function message() {
    let data = {
        message: ''
    };
    data.message = document.querySelector('textarea[name="message"]').value;
    console.log(data);
}
//Create button
let chatProps = [{
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
let chatProps2 = [{
        id: '13',
        name: 'Us12312312312er',
        text: 'Hello!',
        date: '13:37',
        badge: '4'
    }];
const chatList = new ChatList({ title: 'chatProps', users: chatProps });
render(".page_chat_list", chatList);
//chatList.setProps({ title: 'chatProps', users: chatProps2 })
class Chat {
    constructor(elem) {
        this._elem = elem;
        console.log(elem);
        elem.onclick = this.onClick.bind(this); // (*)
    }
    chatList(event) {
        let chatList = document.getElementById('chatList');
        let chatMembersList = [];
        document.querySelector('.dialog-text dialog-mask').remove();
        const chatMembers = new ChatMembers({ title: 'chatProps', chatMembers: chatMembersList });
        render(".page-dialog", chatMembers);
    }
}
new Chat(chat);
class Menu {
    constructor(elem) {
        this._elem = elem;
        console.log(elem);
        elem.onclick = this.onClick.bind(this); // (*)
    }
    chatList(event) {
        let chatList = document.getElementById('chatList');
        let chatMembersList = [];
        document.querySelector('.dialog-text dialog-mask').remove();
        const chatMembers = new ChatMembers({ title: 'chatProps', chatMembers: chatMembersList });
        render(".page-dialog", chatMembers);
    }
    menu(event) {
        let menuPopup = document.querySelector('.page-dialog__pop-up.user-menu');
        if (!menuPopup.hidden) {
            menuPopup.style.left = (event.clientX - menuPopup.offsetWidth) + 'px';
        }
        menuPopup.hidden = !menuPopup.hidden;
    }
    menuAdd(event) {
        let menuAddPopup = document.getElementById('addMenu');
        if (!menuAddPopup.hidden) {
            menuAddPopup.style.left = (event.clientX - menuAddPopup.offsetWidth) + 'px';
        }
        menuAddPopup.hidden = !menuAddPopup.hidden;
    }
    addUser(event) {
        let addUserMenu = document.getElementById('addUserMenu');
        let chatMembers = document.getElementById('chatMembers');
        console.log(chatMembers.value);
        console.log(addUserMenu.value);
        chatMembers.textContent = chatMembers.value + ', ' + addUserMenu.value;
        addUserMenu.hidden;
    }
    menuDelete(event) {
        let menuDeletePopup = document.getElementById('deleteMenu');
        if (!menuDeletePopup.hidden) {
            menuDeletePopup.style.left = (event.clientX - menuDeletePopup.offsetWidth) + 'px';
        }
        menuDeletePopup.hidden = !menuDeletePopup.hidden;
    }
    attach() {
        let menuAttachPopup = document.querySelector('.page-dialog__pop-up.photo-file-menu');
        menuAttachPopup.hidden = !menuAttachPopup.hidden;
    }
    onClick(event) {
        let action = event.target.dataset.action;
        console.log(event.target.closest('button'));
        console.log(event);
        console.log(action);
        if (action) {
            this[action](event);
        }
    }
    ;
}
new Menu(headMenu);
//# sourceMappingURL=chat.js.map
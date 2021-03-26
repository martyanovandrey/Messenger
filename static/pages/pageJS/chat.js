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
/*let chats = document.querySelectorAll('.chat-list__element')
chats.forEach((el) => {
    el.addEventListener("click", function test(id) {chat(this.id)});
})
//(<HTMLButtonElement>document.querySelector(".chat_link")).addEventListener("click", chat(this.id));


function chat(id):void {
    //let userName = document.getElementById('1');
    let data = {id: id}
    sendData(data)

}*/
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
let chatListUsersUpdate = ['User'];
//window.chatListUsersUpdate = chatListUsersUpdate
/*function changeData(data){
    return {type: 'CHANGEDATA', data: data}
}

function mergeData(data){
    return {type: 'MERGEDATA', data: data}
}
console.log(store.state, 'STATEEEEE')
console.log(chatListUsersUpdate.chatListUsers)
store.update(mergeData(chatListUsersUpdate.chatListUsers))
console.log(store.state, 'STATEEEEE')*/
let chats = document.querySelectorAll('.chat-list__element');
chats.forEach((el) => {
    el.addEventListener("click", openChatDialog);
    function openChatDialog() {
        let chatUsers = this.dataset.name;
        if (chatListUsersUpdate[0] === chatUsers) {
            console.log('same');
        }
        else {
            chatListUsersUpdate = [];
            chatListUsersUpdate.push(chatUsers);
        }
        let blankMessage = document.querySelector('.dialog-text.dialog-mask');
        let pageDialog = document.querySelector('.page-dialog');
        if (blankMessage) {
            blankMessage.remove();
        }
        else {
            pageDialog.innerHTML = '';
        }
        const chatMembers = new ChatMembers({ title: 'chatProps', chatMembers: chatListUsersUpdate });
        render(".page-dialog", chatMembers);
        new Menu(headMenu);
    }
});
class Menu {
    constructor(elem) {
        this._elem = elem;
        console.log(elem);
        elem.onclick = this.onClick.bind(this); // (*)
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
        let chatMembersDiv = document.getElementById('chatMembers');
        chatListUsersUpdate.push(addUserMenu.value);
        addUserMenu.hidden;
        //chatMembers.setProps({title: 'chatProps', chatMembers: chatListUsersUpdate});
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
//# sourceMappingURL=chat.js.map
import {ChatList, render} from '../../components/chatList/chatList.js';
const pug = require('pug');

(<HTMLButtonElement>document.querySelector(".button.button_send")).addEventListener("click", message);
        
function message():void {
    interface Data {
        message: String
    }
    let data: Data = {
        message: ''
    }

    data.message = (<HTMLInputElement>document.querySelector('textarea[name="message"]')).value
    console.log(data)
}

//Create button
let chatProps = [{
    id: '1',
    name: 'User',
    text: 'Hello!',
    date: '13:37',
    badge: '4'
},{
    id: '2',
    name: 'Teeeeeest',
    text: 'Hi!',
    date: '13:37'
}]

let chatProps2 = [{
    id: '13',
    name: 'Us12312312312er',
    text: 'Hello!',
    date: '13:37',
    badge: '4'
}]

let chatMembers = []


const chatList = new ChatList({ title: 'chatProps', users: chatProps, chatMembers: chatMembers});
render(".page_chat_list", chatList);

//chatList.setProps({ title: 'chatProps', users: chatProps2 })

class Menu {
    constructor(elem) {
        this._elem = elem;
        console.log(elem);
        elem.onclick = this.onClick.bind(this); // (*)
    }

    menu(event) {
        let menuPopup = document.querySelector('.page-dialog__pop-up.user-menu')
        if (!menuPopup.hidden){
            menuPopup.style.left = (event.clientX - menuPopup.offsetWidth) + 'px';
        }
        menuPopup.hidden = !menuPopup.hidden;
    }
    menuAdd (event) {
        let menuAddPopup = document.getElementById('addMenu')
        if (!menuAddPopup.hidden){
            menuAddPopup.style.left = (event.clientX - menuAddPopup.offsetWidth) + 'px';
        }
        menuAddPopup.hidden = !menuAddPopup.hidden;
    }
    addUser (event) {
        let addUserMenu = document.getElementById('addUserMenu')
        let chatMembers = document.getElementById('chatMembers')
        console.log(chatMembers.value);
        console.log(addUserMenu.value);
        chatMembers.textContent = chatMembers.value + ', ' + addUserMenu.value
        addUserMenu.hidden
    }
    menuDelete (event) {
        let menuDeletePopup = document.getElementById('deleteMenu')
        if (!menuDeletePopup.hidden){
            menuDeletePopup.style.left = (event.clientX - menuDeletePopup.offsetWidth) + 'px';
        }
        menuDeletePopup.hidden = !menuDeletePopup.hidden;
    }
    attach () {
        let menuAttachPopup = document.querySelector('.page-dialog__pop-up.photo-file-menu')
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
    };
}

export new Menu(headMenu);
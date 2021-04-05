import { ChatMembers } from '../../components/chatMembers/chatMembers.js';
import { ChatList, render } from '../../components/chatList/chatList.js';
import { router } from '../../utils/router/router.js';
import { Button, render as renderButton } from '../../components/button/button.js';
import { ChatAPI } from '../../api/chat-api.js';
document.getElementById('createNewChat').addEventListener('click', (event) => {
    const menuCreateChat = document.querySelector('.page-overlay');
    if (menuCreateChat.style.display === 'none') {
        menuCreateChat.style.display = 'block';
        const eventButton = (event) => {
            event.preventDefault();
            let inputCreateChatData = {
                title: document.querySelector('.textinput-control').value
            };
            const createChatApiClient = new ChatAPI();
            createChatApiClient.create(JSON.stringify(inputCreateChatData)).then((data) => {
                console.log(data.response, 'CHAGE DATA STOREEEE');
                //store.update(changeData(JSON.parse(data.response)));
                //console.log(store.state, 'STOREEEESTOREEEESTOREEEESTOREEEE');
            });
        };
        const button = new Button({
            text: 'Добавить',
            event: eventButton,
        });
        renderButton('.app', button);
        console.log('render rdy');
    }
    else {
        menuCreateChat.style.display = 'none';
    }
});
const chatProps = [{
        id: '1',
        title: '2222222222User',
        text: 'Hello!',
        date: '13:37',
        badge: '4',
    }, {
        id: '2',
        title: 'Teeeeeest',
        text: 'Hi!',
        date: '13:37',
    }];
const chatList = new ChatList({ title: 'chatProps', users: chatProps });
console.log(chatList.getContent(), 'add content');
render('.page_chat_list', chatList);
document.getElementById('profile-link').addEventListener('click', (event) => {
    event.preventDefault();
    console.log('teeeest');
    router.go('/profile');
    //chatList.init()
    //chatList.setProps(store.state.users)
});
let chatListUsersUpdate = ['User'];
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
        let headMenu = document.getElementById('headMenu');
        console.log('create headmenu');
        new Menu(headMenu);
    }
});
class Menu {
    constructor(elem) {
        console.log(elem);
        elem.onclick = this.onClick.bind(this);
    }
    menu(event) {
        console.log('test');
        let menuPopup = document.querySelector('.page-dialog__pop-up.user-menu');
        if (menuPopup) {
            if (!menuPopup.hidden) {
                menuPopup.style.left = (event.clientX - menuPopup.offsetWidth) + 'px';
            }
            menuPopup.hidden = !menuPopup.hidden;
        }
        else {
            console.log('menuPopup not found on page');
        }
    }
    menuAdd(event) {
        let menuAddPopup = document.getElementById('addMenu');
        if (menuAddPopup) {
            if (!menuAddPopup.hidden) {
                menuAddPopup.style.left = (event.clientX - menuAddPopup.offsetWidth) + 'px';
            }
            menuAddPopup.hidden = !menuAddPopup.hidden;
        }
        else {
            console.log('menuAddPopup not found on page');
        }
    }
    addUser() {
        let addUserMenu = document.getElementById('addUserMenu');
        if (addUserMenu) {
            chatListUsersUpdate.push(addUserMenu.value);
            addUserMenu.hidden;
            //chatMembers.setProps({title: 'chatProps', chatMembers: chatListUsersUpdate});
        }
        else {
            console.log('addUserMenu not found on page');
        }
    }
    menuDelete(event) {
        let menuDeletePopup = document.getElementById('deleteMenu');
        if (menuDeletePopup) {
            if (!menuDeletePopup.hidden) {
                menuDeletePopup.style.left = (event.clientX - menuDeletePopup.offsetWidth) + 'px';
            }
            menuDeletePopup.hidden = !menuDeletePopup.hidden;
        }
        else {
            console.log('menuDeletePopup not found on page');
        }
    }
    attach() {
        let menuAttachPopup = document.querySelector('.page-dialog__pop-up.photo-file-menu');
        if (menuAttachPopup) {
            menuAttachPopup.hidden = !menuAttachPopup.hidden;
        }
        else {
            console.log('menuAttachPopup not found on page');
        }
    }
    onClick(event) {
        if (event.target instanceof HTMLElement) {
            let action = event.target.dataset.action;
            console.log(event.target.closest('button'));
            console.log(event);
            console.log(action);
            if (action) {
                this[action](event);
            }
        }
    }
    ;
}
//# sourceMappingURL=chat.js.map
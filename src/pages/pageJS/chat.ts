import { ChatMembers } from '../../components/chatMembers/chatMembers.js';
import { ChatList, render } from '../../components/chatList/chatList.js';
import { router } from '../../utils/router/router.js';
import { Button, render as renderButton } from '../../components/button/button.js';
import { ChatAPI } from '../../api/chat-api.js';
import { store } from '../../utils/store/store.js';



(<HTMLButtonElement>document.getElementById('createNewChat')).addEventListener('click', (event) => {
  const menuCreateChat: HTMLElement | null = document.querySelector('.page-overlay');
  if (menuCreateChat.style.display === 'none') {
    menuCreateChat.style.display = 'block';

    const eventButton = (event) => {
        event.preventDefault();
        let inputCreateChatData = {
            title: document.querySelector('.textinput-control').value
        }

        const createChatApiClient = new ChatAPI();
        createChatApiClient.create(JSON.stringify(inputCreateChatData)).then((data) => {
        console.log(data.response, 'CHAGE DATA STOREEEE');
        //store.update(changeData(JSON.parse(data.response)));
        //console.log(store.state, 'STOREEEESTOREEEESTOREEEESTOREEEE');
      })
    };
    const button = new Button({
      text: 'Добавить',
      event: eventButton,
    });
    renderButton('.app', button);

    console.log('render rdy');
  } else {
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

(<HTMLButtonElement>document.getElementById('profile-link')).addEventListener('click', (event) => {
    event.preventDefault();
    console.log('teeeest');
    router.go('/profile');
    //chatList.init()
    //chatList.setProps(store.state.users)
});

let chatListUsersUpdate = ['User']

let chats = document.querySelectorAll('.chat-list__element')
chats.forEach((el) => {

    el.addEventListener("click", openChatDialog);
    function openChatDialog(){
        let chatUsers: string = this.dataset.name
        if(chatListUsersUpdate[0] === chatUsers){
            console.log('same');
        } else {
            chatListUsersUpdate = []
            chatListUsersUpdate.push(chatUsers)
        }
        let blankMessage = document.querySelector('.dialog-text.dialog-mask')
        let pageDialog = (<HTMLElement>document.querySelector('.page-dialog'))
        if(blankMessage){
            blankMessage.remove()
        } else {
            pageDialog.innerHTML = ''
        }
        const chatMembers = new ChatMembers({title: 'chatProps', chatMembers: chatListUsersUpdate});
        render(".page-dialog", chatMembers);
        let headMenu = (<HTMLElement>document.getElementById('headMenu'))
        console.log('create headmenu');
        new Menu(headMenu);
    }
})

interface IRawParams {
    [key: string]: any
}

class Menu implements IRawParams{
    [k: string]: any;

    constructor(elem: HTMLElement) {
        console.log(elem);
        elem.onclick = this.onClick.bind(this);
    }
    menu(event: MouseEvent) {
        console.log('test');
        let menuPopup: HTMLElement | null = document.querySelector('.page-dialog__pop-up.user-menu')
        if (menuPopup){
            if (!menuPopup.hidden){
                menuPopup.style.left = (event.clientX - menuPopup.offsetWidth) + 'px';
            }
            menuPopup.hidden = !menuPopup.hidden;
        } else {
            console.log('menuPopup not found on page');
        }
    }
    menuAdd (event: MouseEvent) {
        let menuAddPopup: HTMLElement | null = document.getElementById('addMenu')
        if (menuAddPopup){
            if (!menuAddPopup.hidden){
                menuAddPopup.style.left = (event.clientX - menuAddPopup.offsetWidth) + 'px';
            }
            menuAddPopup.hidden = !menuAddPopup.hidden
        } else {
            console.log('menuAddPopup not found on page');
        }
    }
    addUser () {
        let addUserMenu = (<HTMLInputElement>document.getElementById('addUserMenu'));
        if (addUserMenu) {
            chatListUsersUpdate.push(addUserMenu.value)
            addUserMenu.hidden
            //chatMembers.setProps({title: 'chatProps', chatMembers: chatListUsersUpdate});
        } else {
            console.log('addUserMenu not found on page');
        }
    }
    menuDelete (event: MouseEvent) {
        let menuDeletePopup: HTMLElement | null = document.getElementById('deleteMenu')
        if (menuDeletePopup) {
            if (!menuDeletePopup.hidden) {
                menuDeletePopup.style.left = (event.clientX - menuDeletePopup.offsetWidth) + 'px';
            }
            menuDeletePopup.hidden = !menuDeletePopup.hidden;
        } else {
            console.log('menuDeletePopup not found on page');
        }
    }
    attach () {
        let menuAttachPopup: HTMLElement | null = document.querySelector('.page-dialog__pop-up.photo-file-menu')
        if (menuAttachPopup) {
            menuAttachPopup.hidden = !menuAttachPopup.hidden;
        } else {
            console.log('menuAttachPopup not found on page');
        }
    }

    onClick(event: Event) {
        if (event.target instanceof HTMLElement) {
            let action = event.target.dataset.action
            console.log(event.target.closest('button'));
            console.log(event);
            console.log(action);
            if (action) {
                this[action](event);
            }
        }
    };
}
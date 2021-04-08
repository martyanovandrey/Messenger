import { ChatMembers } from '../../components/chatMembers/chatMembers.js';
import { ChatList, render } from '../../components/chatList/chatList.js';
import { router } from '../../utils/router/router.js';
import { Button, render as renderButton } from '../../components/button/button.js';
import { OverlayMenu, render as renderOverlay} from '../../components/overlayMenu/overlayMenu.js';
import {ChatAPI, ChatDialogAPI, ChatMembersAPI} from '../../api/chat-api.js';
import { store } from '../../utils/store/store.js';
import { Menu } from '../../utils/event-delegation/event-delegation.js';
import { delegate } from '../../utils/event-delegation/event-delegation-function.js';
import {newButton} from "../../components/newButton/newButton.js";

const eventButton = (event) => {
    event.preventDefault();
    console.log('test btn');
    overlayMenuAdd.hide()
    // let inputCreateChatData = {
    //     title: document.querySelector('.textinput-control').value
    // }
    //
    // const createChatApiClient = new ChatAPI();
    // createChatApiClient.create(JSON.stringify(inputCreateChatData)).then((data) => {
    //     menuCreateChat.style.display = 'none'
    // })
    }

    function test(event){
        event.preventDefault();
        console.log('teseeeeeeeeeeest', event)
    }

const overlayMenuAdd = new OverlayMenu({
    title: "Создать чат",
    button: new newButton({
        id: "change_button",
        text: "Создать",
        event: test
    })});
renderOverlay('.menuPopUpCreateChat', overlayMenuAdd);
overlayMenuAdd.hide()
overlayMenuAdd.setProps({
    title: "Создать чат",
    inputData: 'Имя чата',
});

const overlayMembersAdd = new OverlayMenu({
    title: "Добавить пользователя",
    button: new newButton({
        id: "change_members",
        text: "Добавить",
        event: test
    })});
renderOverlay('.menuPopUpAddMember', overlayMembersAdd);
overlayMembersAdd.hide()
overlayMembersAdd.setProps({
    title: "Добавить",
    inputData: 'Имя пользователя',
});


(<HTMLButtonElement>document.getElementById('createNewChat')).addEventListener('click', (event) => {
    overlayMenuAdd.show()
});


let chatList = new ChatList();

(<HTMLButtonElement>document.getElementById('profile-link')).addEventListener('click', (event) => {
    event.preventDefault();
    router.go('/profile');
});


function changeData(data) {
    return { type: 'CHANGEDATA', data };
}

//Event delegation for dialog menu
class DialogMenu extends Menu {
    menu(event: MouseEvent) {
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
            addUserMenu.hidden
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
}

//Event delegation for chat menu
class ChatMenu extends Menu {
    openChat(event: MouseEvent) {

    }
}

new ChatMenu(chat);


class addChatBtn extends Menu {
    addChat(event: MouseEvent) {
        event.preventDefault();
        overlayMenuAdd.hide()
        let inputCreateChatData = {
            title: document.querySelector('.textinput-control').value
        }
        const createChatApiClient = new ChatAPI();
        createChatApiClient.create(JSON.stringify(inputCreateChatData)).then((data) => {
            const createChatApiClient = new ChatAPI();
            createChatApiClient.request()
                .then((data) => data.response)
                .then(data => {
                    function changeData(data) {
                        return { type: 'CHANGEDATA', data };
                    }
                    let chatData = JSON.parse(data).map(el => {
                        el.last_message = JSON.parse(el.last_message)
                        if(el.last_message != null){
                            let dataTest = el.last_message
                            el.last_message = dataTest.content
                        }
                        return el
                    })
                    store.update(changeData({users: chatData}));
                });
        })
    }
}

new addChatBtn(change_button);

// event delegation v2



let fixedBoxEl = document.querySelector('.page-wrap');
delegate(fixedBoxEl, 'click', 'delegate', function(event){
    let menuPopup: HTMLElement | null = document.querySelector('.page-dialog__pop-up.user-menu')
    if (menuPopup){
        if (!menuPopup.hidden){
            menuPopup.style.left = (event.clientX - menuPopup.offsetWidth) + 'px';
        }
        menuPopup.hidden = !menuPopup.hidden;
    } else {
        console.log('menuPopup not found on page');
    }
});

delegate(fixedBoxEl, 'click', 'menuAdd', function(event){
    overlayMembersAdd.show()
});

delegate(fixedBoxEl, 'click', 'change_members', function(event){
    event.preventDefault();
    overlayMembersAdd.hide()
    let inputAddMemberData =
    {
        "users": [
        document.querySelector('.textinput-control').value
    ],
        "chatId": store.state.currentChat
    }
    // call chat members
    const chatMemberstApiClient = new ChatMembersAPI();
    chatMemberstApiClient.update(inputAddMemberData)
        .then((data) => data.response)
        .then(data => {
            store.update(changeData({chatMembers: JSON.parse(data)}));
        });
});


delegate(fixedBoxEl, 'click', 'page-overlay__wrap', function(event){
    overlayMenuAdd.hide()
    overlayMembersAdd.hide()
});

delegate(fixedBoxEl, 'click', 'chat_link', function(event){

    let chatId: string = event.target.closest('li').dataset.id
    let chatName: string = event.target.closest('li').dataset.name
    console.log(event.target, chatId, chatName,'logggggggggggg');
    //update current chat
    store.update(changeData({currentChat: {
            chatId: chatId,
            chatName: chatName
        }}));

    // call chat members
    const chatMemberstApiClient = new ChatMembersAPI();
    chatMemberstApiClient.request(chatId)
        .then((data) => data.response)
        .then(data => {
            store.update(changeData({chatMembers: JSON.parse(data)}));
        });

    // call chat token
    store.update(changeData({messages: []}));
    const chatMembersPage = new ChatMembers({
        title: 'chatProps',
        currentChat: {
            chatId: chatId,
            chatName: chatName,
        }
    });
    console.log(store.state, 'STATEEEEE');

    //scroll down
    let dialogText = document.querySelector(".dialog-text");
    dialogText.scrollTop = dialogText.scrollHeight;

    // open WSS and load chat messages
    const chatDialogApiClient = new ChatDialogAPI();
    chatDialogApiClient.create(store.state.currentChat.chatId).then((data) => {
        let token = JSON.parse(data.response).token
        store.update(changeData({chatToken: token
        } ));
        const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${store.state.id}/${store.state.currentChat.chatId}/${store.state.chatToken}`);
        socket.addEventListener('open', () => {
            console.log('Соединение установлено');
            socket.send(JSON.stringify({
                content: '0',
                type: 'get old',
            }));
            socket.addEventListener('message', event => {


                if(JSON.parse(event.data).length > 1){
                    console.log(JSON.parse(event.data), 'JSON.parse(event.data)');
                    let newMessages = JSON.parse(event.data).map(el => {
                        let date = new Date(el.time)
                        let min = date.getMinutes()
                        if (min < 10){
                            min = '0' + min
                        }
                        el.time = `${date.getHours()}:${min}`
                        return el
                    })
                    store.update(changeData({messages: newMessages}));
                } else if (store.state.messages.length != 0){
                    socket.send(JSON.stringify({
                        content: '0',
                        type: 'get old',
                    }));
                } else if (store.state.messages.length === 0 && JSON.parse(event.data).length === 1){

                    store.update(changeData({messages: JSON.parse(event.data)}));
                    console.log(store.state);
                }
                document.getElementById('sendMessage').addEventListener('click', sendMe)
                function sendMe(event){
                    event.preventDefault();
                    console.log('clicked!');
                    let message = document.getElementById('messageInput').value;
                    if (message != ''){
                        socket.send(JSON.stringify({
                            content: `${message}`,
                            type: 'message',
                        }));
                        socket.send(JSON.stringify({
                            content: '0',
                            type: 'get old',
                        }));
                    } else {
                        console.log('empty message');
                    }
                }
            });
        });

        socket.addEventListener('close', event => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }

            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });

        socket.addEventListener('error', event => {
            console.log('Ошибка', event.message);
        });
    })
});
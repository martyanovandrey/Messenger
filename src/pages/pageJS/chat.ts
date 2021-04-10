import { ChatMembers } from '../../components/chatMembers/chatMembers';
import { ChatList } from '../../components/chatList/chatList';
import { router } from '../../utils/router/router';
import { OverlayMenu, render as renderOverlay } from '../../components/overlayMenu/overlayMenu';
import { ChatAPI, ChatDialogAPI, ChatMembersAPI } from '../../api/chat-api';
import { store } from '../../utils/store/store';
import { Menu } from '../../utils/event-delegation/event-delegation';
import { delegate } from '../../utils/event-delegation/event-delegation-function';
import { newButton } from '../../components/newButton/newButton';

const overlayMenuAdd = new OverlayMenu({
    title: 'Создать чат',
    button: new newButton({
        id: 'change_button',
        text: 'Создать'
    }),
});
renderOverlay('.menuPopUpCreateChat', overlayMenuAdd);
overlayMenuAdd.hide();
overlayMenuAdd.setProps({
    title: 'Создать чат',
    inputData: 'Имя чата',
});

const overlayMembersAdd = new OverlayMenu({
    title: 'Добавить пользователя',
    button: new newButton({
        id: 'change_members',
        text: 'Добавить'
    }),
});
renderOverlay('.menuPopUpAddMember', overlayMembersAdd);
overlayMembersAdd.hide();
overlayMembersAdd.setProps({
    title: 'Добавить',
    inputData: 'Имя пользователя',
});

(<HTMLButtonElement>document.getElementById('createNewChat')).addEventListener('click', () => {
    overlayMenuAdd.show();
});

new ChatList();

(<HTMLButtonElement>document.getElementById('profile-link')).addEventListener('click', (event) => {
    event.preventDefault();
    router.go('/profile');
});

function changeData(data: Record<string, any>) {
    return { type: 'CHANGEDATA', data };
}

// Event delegation for dialog menu
// @ts-ignore
class DialogMenu extends Menu {
    menu(event: MouseEvent) {
        const menuPopup: HTMLElement | null = document.querySelector('.page-dialog__pop-up.user-menu');
        if (menuPopup) {
            if (!menuPopup.hidden) {
                menuPopup.style.left = `${event.clientX - menuPopup.offsetWidth}px`;
            }
            menuPopup.hidden = !menuPopup.hidden;
        } else {
            console.log('menuPopup not found on page');
        }
    }

    menuAdd(event: MouseEvent) {
        const menuAddPopup: HTMLElement | null = document.getElementById('addMenu');
        if (menuAddPopup) {
            if (!menuAddPopup.hidden) {
                menuAddPopup.style.left = `${event.clientX - menuAddPopup.offsetWidth}px`;
            }
            menuAddPopup.hidden = !menuAddPopup.hidden;
        } else {
            console.log('menuAddPopup not found on page');
        }
    }

    addUser() {
        const addUserMenu = (<HTMLInputElement>document.getElementById('addUserMenu'));
        if (addUserMenu) {
            addUserMenu.hidden;
        } else {
            console.log('addUserMenu not found on page');
        }
    }

    menuDelete(event: MouseEvent) {
        const menuDeletePopup: HTMLElement | null = document.getElementById('deleteMenu');
        if (menuDeletePopup) {
            if (!menuDeletePopup.hidden) {
                menuDeletePopup.style.left = `${event.clientX - menuDeletePopup.offsetWidth}px`;
            }
            menuDeletePopup.hidden = !menuDeletePopup.hidden;
        } else {
            console.log('menuDeletePopup not found on page');
        }
    }

    attach() {
        const menuAttachPopup: HTMLElement | null = document.querySelector('.page-dialog__pop-up.photo-file-menu');
        if (menuAttachPopup) {
            menuAttachPopup.hidden = !menuAttachPopup.hidden;
        } else {
            console.log('menuAttachPopup not found on page');
        }
    }
}


class addChatBtn extends Menu {
    addChat(event: MouseEvent) {
        event.preventDefault();
        overlayMenuAdd.hide();
        const inputCreateChatData = {
            title: (<HTMLInputElement>document.querySelector('.textinput-control')).value,
        };
        const createChatApiClient = new ChatAPI();
        createChatApiClient.create(JSON.stringify(inputCreateChatData)).then(() => {
            const createChatApiClient = new ChatAPI();
            createChatApiClient.request()
                .then((data) => data.response)
                .then((data) => {
                    function changeData(data: Record<string, any>) {
                        return { type: 'CHANGEDATA', data };
                    }
                    const chatData = JSON.parse(data).map((el: any) => {
                        el.last_message = JSON.parse(el.last_message);
                        if (el.last_message != null) {
                            const dataTest = el.last_message;
                            el.last_message = dataTest.content;
                        }
                        return el;
                    });
                    store.update(changeData({ users: chatData }));
                });
        });
    }
}

// @ts-ignore
new addChatBtn(change_button);

// event delegation v2

const fixedBoxEl = document.querySelector('.page-wrap');
delegate(fixedBoxEl, 'click', 'delegate', (event: MouseEvent) => {
    const menuPopup: HTMLElement | null = document.querySelector('.page-dialog__pop-up.user-menu');
    if (menuPopup) {
        if (!menuPopup.hidden) {
            menuPopup.style.left = `${event.clientX - menuPopup.offsetWidth}px`;
        }
        menuPopup.hidden = !menuPopup.hidden;
    } else {
        console.log('menuPopup not found on page');
    }
});

delegate(fixedBoxEl, 'click', 'menuAdd', () => {
    overlayMembersAdd.show();
});

delegate(fixedBoxEl, 'click', 'change_members', (event: MouseEvent) => {
    event.preventDefault();
    overlayMembersAdd.hide();
    const inputAddMemberData = {
        users: [
            (<HTMLInputElement>document.querySelector('.textinput-control')).value,
        ],
        chatId: store.state.currentChat,
    };
    // call chat members
    const chatMemberstApiClient = new ChatMembersAPI();
    chatMemberstApiClient.update(inputAddMemberData)
        .then((data) => data.response)
        .then((data) => {
            store.update(changeData({ chatMembers: JSON.parse(data) }));
        });
});

delegate(fixedBoxEl, 'click', 'page-overlay__wrap', (event: MouseEvent) => {
    // @ts-ignore
    if(event.target.className === 'page-overlay__wrap'){
        overlayMenuAdd.hide();
        overlayMembersAdd.hide();
    }
});

delegate(fixedBoxEl, 'click', 'chat_link', (event: MouseEvent) => {
    // @ts-ignore
    const chatId: string = event.target.closest('li').dataset.id;
    // @ts-ignore
    const chatName: string = event.target.closest('li').dataset.name;
    console.log(event.target, chatId, chatName, 'logggggggggggg');
    // update current chat
    store.update(changeData({
        currentChat: {
            chatId,
            chatName,
        },
    }));

    // call chat members
    const chatMemberstApiClient = new ChatMembersAPI();
    chatMemberstApiClient.request(chatId)
        .then((data) => data.response)
        .then((data) => {
            store.update(changeData({ chatMembers: JSON.parse(data) }));
        });

    // call chat token
    store.update(changeData({ messages: [] }));
    new ChatMembers({
        title: 'chatProps',
        currentChat: {
            chatId,
            chatName,
        },
    });
    console.log(store.state, 'STATEEEEE');

    // scroll down
    const dialogText = (<HTMLElement>document.querySelector('.dialog-text'));
    dialogText.scrollTop = dialogText.scrollHeight;

    // open WSS and load chat messages
    const chatDialogApiClient = new ChatDialogAPI();
    chatDialogApiClient.create(store.state.currentChat.chatId).then((data) => {
        const { token } = JSON.parse(data.response);
        store.update(changeData({ chatToken: token }));
        const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${store.state.id}/${store.state.currentChat.chatId}/${store.state.chatToken}`);
        socket.addEventListener('open', () => {
            console.log('Соединение установлено');
            socket.send(JSON.stringify({
                content: '0',
                type: 'get old',
            }));
            socket.addEventListener('message', (event) => {
                if (JSON.parse(event.data).length > 1) {
                    console.log(JSON.parse(event.data), 'JSON.parse(event.data)');
                    const newMessages = JSON.parse(event.data).map((el: any) => {
                        const date = new Date(el.time);
                        let min: any = date.getMinutes();
                        if (min < 10) {
                            min = `0${min}`;
                        }
                        el.time = `${date.getHours()}:${min}`;
                        return el;
                    });
                    store.update(changeData({ messages: newMessages }));
                } else if (store.state.messages.length != 0) {
                    socket.send(JSON.stringify({
                        content: '0',
                        type: 'get old',
                    }));
                } else if (store.state.messages.length === 0 && JSON.parse(event.data).length === 1) {
                    store.update(changeData({ messages: JSON.parse(event.data) }));
                    console.log(store.state);
                }
                (<HTMLElement>document.getElementById('sendMessage')).addEventListener('click', sendMe);
                function sendMe(event: MouseEvent) {
                    event.preventDefault();
                    console.log('clicked!');
                    const message = (<HTMLInputElement>document.getElementById('messageInput')).value;
                    if (message != '') {
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

        socket.addEventListener('close', (event) => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }

            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });

        socket.addEventListener('error', (event) => {
            // @ts-ignore
            console.log('Ошибка', event.message);
        });
    });
});

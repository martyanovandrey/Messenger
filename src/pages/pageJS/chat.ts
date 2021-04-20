import { ChatMembers } from '../../components/chatMembers/chatMembers';
import { ChatList } from '../../components/chatList/chatList';
import { router } from '../../utils/router/router';
import { OverlayMenu, render as renderOverlay } from '../../components/overlayMenu/overlayMenu';
import { ChatAPI, ChatDialogAPI, ChatMembersAPI } from '../../api/chat-api';
import { getUserAPI } from '../../api/profile-api';
import { store } from '../../utils/store/store';
import { ChatSocket } from '../../utils/socket/chatSocket';
import {changeData, pushData, deleteFromArrayData} from '../../utils/store/actionFuncStore';
import { delegate } from '../../utils/event-delegation/event-delegation-function';
import { newButton } from '../../components/newButton/newButton';

const overlayMenuAdd = new OverlayMenu({
    inputId: 'createChat',
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
    inputId: 'addMember',
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

const overlayMembersDelete = new OverlayMenu({
    inputId: 'deleteMember',
    title: 'Удалить пользователя',
    button: new newButton({
        id: 'delete_members',
        text: 'Удалить'
    }),
});
renderOverlay('.menuPopUpDeleteMember', overlayMembersDelete);
overlayMembersDelete.hide();
overlayMembersDelete.setProps({
    title: 'Удалить',
    inputData: 'Имя пользователя',
});

document.getElementById('createNewChat')?.addEventListener('click', () => {
    overlayMenuAdd.show();
});

new ChatList();

document.getElementById('profile-link')?.addEventListener('click', (event) => {
    event.preventDefault();
    router.go('/profile');
});


// event delegation v2
const fixedBoxEl = document.querySelector('.page-wrap');

delegate(fixedBoxEl, 'click', 'change_button', (event: MouseEvent) => {
    event.preventDefault();
    overlayMenuAdd.hide();
    let chatInput = document.querySelector('.textinput-control')
    if(chatInput){
       let newChatValue = (chatInput as HTMLInputElement).value

    const inputCreateChatData = {
        title: newChatValue,
    };
    const createChatApiClient = new ChatAPI();
    createChatApiClient.create(JSON.stringify(inputCreateChatData)).then(() => {
        const createChatApiClient = new ChatAPI();
        createChatApiClient.request()
            .then((data) => {
                const chatData = JSON.parse(data.response).map((el: Record<string, any>) => {
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
});


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
    const addMembersInput = document.getElementById('addMember');
    if(addMembersInput) {
        const addUserInput = {
            login: (addMembersInput as HTMLInputElement).value
        }
        const getUserApiClient = new getUserAPI();
        getUserApiClient.create(JSON.stringify(addUserInput))
            .then((data) => data.response)
            .then((data) => {
                const usersId = JSON.parse(data).map((el: { id: string; }) => el.id)
                const inputAddMemberData = {
                    users: usersId,
                    chatId: store.state.currentChat.chatId,
                };

                // call chat members
                const chatMemberstApiClient = new ChatMembersAPI();
                chatMemberstApiClient.update(JSON.stringify(inputAddMemberData))
                    .then((data) => data.response)
                    .then(() => {
                        store.update(pushData({first_name: addUserInput.login}));
                    });
            });
    }
});

delegate(fixedBoxEl, 'click', 'page-overlay__wrap', (event: MouseEvent) => {
    // @ts-ignore
    if(event.target.className === 'page-overlay__wrap'){
        overlayMenuAdd.hide();
        overlayMembersAdd.hide();
        overlayMembersDelete.hide();
    }
});

delegate(fixedBoxEl, 'click', 'chat_link', (event: MouseEvent) => {
    // @ts-ignore
    const chatId: string = event.target.closest('li').dataset.id;
    // @ts-ignore
    const chatName: string = event.target.closest('li').dataset.name;
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

    // scroll down
    const dialogText = (<HTMLElement>document.querySelector('.dialog-text'));
    dialogText.scrollTop = dialogText.scrollHeight;

    // open WSS and load chat messages
    const chatDialogApiClient = new ChatDialogAPI();
    chatDialogApiClient.create(store.state.currentChat.chatId).then((data) => {
        const { token } = JSON.parse(data.response);
        store.update(changeData({ chatToken: token }));
        const chatSocket = new ChatSocket(`wss://ya-praktikum.tech/ws/chats/${store.state.id}/${store.state.currentChat.chatId}/${store.state.chatToken}`);
        chatSocket.openWebSocket()

    });
});

delegate(fixedBoxEl, 'click', 'menuDelete', () => {
    overlayMembersDelete.show()
});

delegate(fixedBoxEl, 'click', 'delete_members', (event: MouseEvent) => {
    event.preventDefault();
    overlayMembersDelete.hide();
    let deleteMemberInput = document.getElementById('deleteMember')
    if(!deleteMemberInput){
        return console.log('delete member input not found');
    }
    const addUserInput = {
        login: (deleteMemberInput as HTMLInputElement).value
    }

    const getUserApiClient = new getUserAPI();
    getUserApiClient.create(JSON.stringify(addUserInput))
        .then((data) => data.response)
        .then((data) => {
            const usersId = JSON.parse(data).map((el: { id: string; }) => el.id)
            const inputAddMemberData = {
                users: usersId,
                chatId: store.state.currentChat.chatId,
            };

            // call chat members
            const chatMemberstApiClient = new ChatMembersAPI();
            chatMemberstApiClient.delete(JSON.stringify(inputAddMemberData))
                .then((data) => data.response)
                .then(() => {
                    store.update(deleteFromArrayData( {first_name: addUserInput.login  }));
                });
        });
});

delegate(fixedBoxEl, 'click', 'menuDeleteChat', (event: MouseEvent) => {
    const menuDeletePopup: HTMLElement | null = document.getElementById('deleteMenu');
    if (menuDeletePopup) {
        if (!menuDeletePopup.hidden) {
            // @ts-ignore
            menuDeletePopup.style.left = `${event.clientX - menuDeletePopup.offsetWidth}px`;
        }
        menuDeletePopup.hidden = !menuDeletePopup.hidden;
    } else {
        console.log('menuDeletePopup not found on page');
    }
});

delegate(fixedBoxEl, 'click', 'deleteChatYes', () => {
    const chatDelId = {
        "chatId": store.state.currentChat.chatId
    }
    const createChatApiClient = new ChatAPI();
    createChatApiClient.delete(JSON.stringify(chatDelId)).then(() => {

    });

    createChatApiClient.request()
        .then((data) => {
            const chatData = JSON.parse(data.response).map((el: Record<string, any>) => {
                if (typeof el.last_message === "string") {
                    el.last_message = JSON.parse(el.last_message);
                }
                if (el.last_message != null) {
                    const dataTest = el.last_message;
                    el.last_message = dataTest.content;
                }
                return el;
            });
            store.update(changeData({ users: chatData }));
            store.update(changeData({ currentChat: {
                    chatId: '',
                    chatName: ''
                } }));
        });
});

delegate(fixedBoxEl, 'click', 'deleteChatNo', () => {
    const menuDeletePopup = (<HTMLElement>document.getElementById('deleteMenu'));
    menuDeletePopup.hidden = true
});

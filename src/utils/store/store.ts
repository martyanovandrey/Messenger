import { UserAPI } from '../../api/signin-api';
import merge from '../merge/merge';

function updateState(state:any, action: { type: string; data: Record<string, any> }) {
    if (action.type === 'CHANGEDATA') {
        //    let newState = Object.assign(state, action.data);
        console.log(action, '123123123123123123123')
        const newState = merge(state, action.data);

        return newState;
    }
    if (action.type === 'PUSHDATA') {
        state.chatMembers.push(action.data);
        console.log(state, action.data, 'newstateeeeeeeeee');
        return state;
    }
    if (action.type === 'DELETEFROMARRAY') {
        state.chatMembers = state.chatMembers.filter((obj: any) => obj.first_name !== action.data.first_name)
        console.log(state, action.data, 'newstateeeeeeeeee');
        return state;
    }
}




class Store {
    private _updateState: any;

    private _state: any;

    private _callbacks: any;

    constructor(updateState:any, state: any) {
        this._updateState = updateState;
        this._state = state;
        this._callbacks = [];
    }

    get state() {
        return this._state;
    }

    update(action: { type: string; data: any; }) {
        this._state = this._updateState(this._state, action);
        this._callbacks.forEach((callback: () => void) => callback());
    }

    subscribe(callback: any) {
        this._callbacks.push(callback);
        return () => this._callbacks = this._callbacks.filter((cb: void) => cb !== callback);
    }
}

const initialstate = {
    id: '1',
    first_name: 'User',
    second_name: 'test',
    display_name: 'test',
    login: 'test',
    email: 'test',
    password: 'test',
    phone: 'test',
    currentChat: {
        chatId: 'chatId',
        chatName: 'chatName',
    },
    chatMembers: [
        {
            first_name: '',
        },
    ],
    messages: [
        {
            content: '',
            time: '',
        },
    ],
    users: [],
};

export const store = new Store(updateState, initialstate);

interface Data {
    [key: string]: string;
}

function changeData(data: Data) {
    return { type: 'CHANGEDATA', data };
}

const userApiClient = new UserAPI();
userApiClient.request().then((data) => {
    store.update(changeData(JSON.parse(data.response)));
});

import { UserAPI } from '../../api/signin-api.js';
import merge from "../merge/merge.js";
function updateState(state, action) {
    if (action.type === 'CHANGEDATA') {
        //    let newState = Object.assign(state, action.data);
        let newState = merge(state, action.data);
        return newState;
    }
    if (action.type === 'PUSHDATA') {
        //    let newState = Object.assign(state, action.data);
        let updMessages = state.messages;
        console.log(updMessages, action.data, 'action.dataaction.dataaction.data');
        let newState = updMessages.push(action.data);
        return state;
    }
}
class Store {
    constructor(updateState, state) {
        this._updateState = updateState;
        this._state = state;
        this._callbacks = [];
    }
    get state() {
        return this._state;
    }
    update(action) {
        this._state = this._updateState(this._state, action);
        this._callbacks.forEach((callback) => callback());
    }
    subscribe(callback) {
        this._callbacks.push(callback);
        return () => this._callbacks = this._callbacks.filter((cb) => cb !== callback);
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
            first_name: ''
        }
    ],
    messages: [
        {
            content: '',
            time: ''
        }
    ],
    users: []
};
export const store = new Store(updateState, initialstate);
function changeData(data) {
    return { type: 'CHANGEDATA', data };
}
const userApiClient = new UserAPI();
userApiClient.request().then((data) => {
    store.update(changeData(JSON.parse(data.response)));
});
//# sourceMappingURL=store.js.map
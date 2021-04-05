import { UserAPI } from '../../api/signin-api.js';
function updateState(state, action) {
    if (action.type === 'CHANGEDATA') {
        console.log('IM CHANGEDATA');
        let newState = Object.assign(state, action.data);
        return newState;
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
    userMessage: 'Wuzzzuuuuuup',
    myMessage: 'Wuzzzuuuuuuuuuuuuuuuuuuuup',
    users: [{
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
        }]
};
export const store = new Store(updateState, initialstate);
function changeData(data) {
    return { type: 'CHANGEDATA', data };
}
const userApiClient = new UserAPI();
userApiClient.request().then((data) => {
    console.log(JSON.parse(data.response), 'daataaaaaaaaaaaaaa');
    store.update(changeData(JSON.parse(data.response)));
});
//# sourceMappingURL=store.js.map
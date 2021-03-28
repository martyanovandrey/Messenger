function updateState(state, action) {
    if (action.type === 'CHANGEDATA') {
        console.log('IM CHANGEDATA');
        return Object.assign(state, action.data);
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
    first_name: "User",
    second_name: "test",
    display_name: "test",
    login: "test",
    email: "test",
    password: "test",
    phone: "test",
    userMessage: "Wuzzzuuuuuup",
    myMessage: "Wuzzzuuuuuuuuuuuuuuuuuuuup"
};
export const store = new Store(updateState, initialstate);
//# sourceMappingURL=store.js.map
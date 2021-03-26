import cloneDeep from "../cloneDeep/cloneDeep.js";

function updateState(state, action) {
    if (action.type === 'CHANGEDATA'){
        return cloneDeep(state, action.data)
    }
}

const changeData = {type: 'CHANGEDATA', data: {}}

export default class Store{
    constructor(updateState, state) {
        this._updateState = updateState;
        this._state = state;
        this._callbacks = [];
    }

    get state() {
        return this._state
    }

    update(action){
        this._state = this._updateState(this._state, action)
        this._callbacks.forEach(callback => callback())
    }

    subscribe(callback){
        this._callbacks.push(callback)
        return () => this._callbacks = this._callbacks.filter(cb => cb !== callback)
    }

}
const initialState = {count: 0}



let usersData = [
    {
        id: '1',
        first_name: "User",
        second_name: "test",
        display_name: "test",
        login: "test",
        email: "test",
        password: "test",
        phone: "test",
    }, {
        id: '2',
        first_name: "Joe",
        second_name: "test2",
        display_name: "test2",
        login: "test2",
        email: "test2",
        password: "test2",
        phone: "test2"
    },
]

const users = new Store(usersData, initialState)
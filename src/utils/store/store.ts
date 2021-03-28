function updateState(state:any, action: { type: string; data: object; }) {
    if (action.type === 'CHANGEDATA'){
        console.log('IM CHANGEDATA');
        return Object.assign(state, action.data)
    }
}

class Store{
    private _updateState: any;
    private _state: any;
    private _callbacks: any;

    constructor(updateState:any, state: any) {
        this._updateState = updateState;
        this._state = state;
        this._callbacks = [];
    }

    get state() {
        return this._state
    }

    update(action: { type: string; data: any; }){
        this._state = this._updateState(this._state, action)
        this._callbacks.forEach((callback: () => void) => callback())
    }

    subscribe(callback: void){
        this._callbacks.push(callback)
        return () => this._callbacks = this._callbacks.filter((cb: void) => cb !== callback)
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
}

export const store = new Store(updateState, initialstate)


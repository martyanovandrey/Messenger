export default class Store {
    constructor(updateState, state) {
        this._updateState = updateState
        this._state = state
        this._callbacks = []
    }

    get state() {
        return this._state;
    }

    update(action){
        this._state = this._updateState(this._state, action);
        console.log(this._state);
        this._callbacks.forEach(callback => callback());
    }

    subscribe(callback){
        this._callbacks.push(callback);
        return () => this._callbacks = this._callbacks.filter(cb => cb !== callback);
    }
}



/*
export function createStore(reducer, initialState){
    let state = initialState;
    let callbacks = [];

    const getState = () => state;

    const dispatch = action => {
        state = reducer(state, action);
        callbacks.forEach(callback => callback());
    };

    const subscribe = callback => {
        callbacks.push(callback);
        return () => callbacks.filter(cb => cb !== callback);
    };

    dispatch({});
    return {getState, dispatch, subscribe };
}*/

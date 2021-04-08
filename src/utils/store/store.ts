import { UserAPI } from '../../api/signin-api.js';
import merge from "../merge/merge.js";

function updateState(state:any, action: { type: string; data: object; }) {
  if (action.type === 'CHANGEDATA') {
      //    let newState = Object.assign(state, action.data);
    let newState = merge(state, action.data);

    return newState;
  }
    if (action.type === 'PUSHDATA') {
        //    let newState = Object.assign(state, action.data);
        let updMessages = state.messages
        console.log(updMessages, action.data, 'action.dataaction.dataaction.data');
        let newState = updMessages.push(action.data)

        return state
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

  subscribe(callback: void) {
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

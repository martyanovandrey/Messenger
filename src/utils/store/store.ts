import { UserAPI } from '../../api/signin-api.js';

function updateState(state:any, action: { type: string; data: object; }) {
  if (action.type === 'CHANGEDATA') {
    console.log('IM CHANGEDATA');
    let newState = Object.assign(state, action.data);

    return newState;
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

interface Data {
  [key: string]: string;
}

function changeData(data: Data) {
  return { type: 'CHANGEDATA', data };
}

const userApiClient = new UserAPI();
userApiClient.request().then((data) => {
  console.log(JSON.parse(data.response), 'daataaaaaaaaaaaaaa');
  store.update(changeData(JSON.parse(data.response)));
});

import { HTTPTransport } from '../utils/xhr/xhr.js';
import { BaseAPI } from './base-api.js';

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// const profileAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/user');
// class ProfileAPI extends BaseAPI {
//   update(data:string): Promise<XMLHttpRequest> {
//     return profileAPIInstance.put('/profile', { ...options, data });
//   }
// }

const profileChange = new HTTPTransport('https://ya-praktikum.tech/api/v2/user');
class ProfileChangeAPI extends BaseAPI {
  update(data:string): Promise<XMLHttpRequest> {
    // добавил комментарий в readme
    return profileChange.put('/profile', { ...options, data });
  }
}

const profileChangePsw = new HTTPTransport('https://ya-praktikum.tech/api/v2/user');
class ProfileChangePswAPI extends BaseAPI {
  update(data:string): Promise<XMLHttpRequest> {
    return profileChangePsw.put('/password', { ...options, data });
  }
}

export { ProfileChangeAPI, ProfileChangePswAPI };

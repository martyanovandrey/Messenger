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
    update(data) {
        // добавил комментарий в readme
        return profileChange.put('/profile', Object.assign(Object.assign({}, options), { data }));
    }
}
const profileChangePsw = new HTTPTransport('https://ya-praktikum.tech/api/v2/user');
class ProfileChangePswAPI extends BaseAPI {
    update(data) {
        return profileChangePsw.put('/password', Object.assign(Object.assign({}, options), { data }));
    }
}
export { ProfileChangeAPI, ProfileChangePswAPI };
//# sourceMappingURL=profile-api.js.map
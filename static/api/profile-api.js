import { HTTPTransport } from '../utils/xhr/xhr.js';
import { BaseAPI } from "./base-api.js";
let options = {
    headers: {
        'Content-Type': 'application/json'
    }
};
let profileAPIInstance = new HTTPTransport('/api/v1/user');
class ProfileAPI extends BaseAPI {
    update(data) {
        return profileAPIInstance.put('/profile', Object.assign(Object.assign({}, options), { data }));
    }
}
let profileChange = new HTTPTransport('/api/v1/user');
class ProfileChangeAPI extends BaseAPI {
    update(data) {
        return profileChange.put('/profile/change', Object.assign(Object.assign({}, options), { data }));
    }
}
let profileChangePsw = new HTTPTransport();
class ProfileChangePswAPI extends BaseAPI {
    update(data) {
        return profileChangePsw.put('/password/change', Object.assign(Object.assign({}, options), { data }));
    }
}
export { ProfileAPI, ProfileChangeAPI, ProfileChangePswAPI };
//# sourceMappingURL=profile-api.js.map
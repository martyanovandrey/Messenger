import { HTTPTransport } from '../utils/xhr/xhr.js'
import { BaseAPI} from "./base-api.js";

console.log('im loadded');

let options = {
    headers: {
        'Content-Type': 'application/json'
    }
}

let profileAPIInstance = new HTTPTransport();
class ProfileAPI extends BaseAPI {
    update(data) {
        return profileAPIInstance.put('/api/v1/user/profile', {...options, data});
    }
}

let profileChange = new HTTPTransport();
class ProfileChangeAPI extends BaseAPI {
    update(data) {
        return profileChange.put('/api/v1/user/profile/change', {...options, data});
    }
}

let profileChangePswPage = new HTTPTransport();
class ProfileChangePswPageAPI extends BaseAPI {
    request(data) {
        return profileChangePswPage.get('/api/v1/user/password', {...options, data});
    }
}

let profileChangePsw = new HTTPTransport();
class ProfileChangePswAPI extends BaseAPI {
    update(data) {
        return profileChangePsw.put('/api/v1/user/password/change', {...options, data});
    }
}

export { ProfileAPI, ProfileChangeAPI, ProfileChangePswPageAPI, ProfileChangePswAPI }
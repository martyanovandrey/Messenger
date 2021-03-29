import { HTTPTransport } from '../utils/xhr/xhr.js'
import { BaseAPI} from "./base-api.js";

let options = {
    headers: {
        'Content-Type': 'application/json'
    }
}

let profileAPIInstance = new HTTPTransport('/api/v1/user');
class ProfileAPI extends BaseAPI {
    update(data:string): Promise<XMLHttpRequest> {
        return profileAPIInstance.put('/profile', {...options, data});
    }
}

let profileChange = new HTTPTransport('/api/v1/user');
class ProfileChangeAPI extends BaseAPI {
    update(data:string): Promise<XMLHttpRequest> {
        //добавил комментарий в readme
        return profileChange.put('/profile/change', {...options, data});
    }
}

let profileChangePsw = new HTTPTransport();
class ProfileChangePswAPI extends BaseAPI {
    update(data:string): Promise<XMLHttpRequest> {
        return profileChangePsw.put('/password/change', {...options, data});
    }
}

export { ProfileAPI, ProfileChangeAPI, ProfileChangePswAPI }
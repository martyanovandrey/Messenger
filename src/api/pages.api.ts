import { HTTPTransport } from '../utils/xhr/xhr.js'
import { BaseAPI} from "./base-api.js";

let options = {
    headers: {
        'Content-Type': 'application/json'
    }
}

let signAPIInstance = new HTTPTransport();

class SigninPageAPI extends BaseAPI {
    create(data:string): Promise<XMLHttpRequest> {
        return signAPIInstance.post('/', {...options, data});
    }

    request() {
        return signAPIInstance.get('/', {...options});
    }
}

class SignupPageAPI extends BaseAPI {
    create(data:string): Promise<XMLHttpRequest> {
        return signAPIInstance.post('/signup', {...options, data});
    }

    request() {
        return signAPIInstance.get('/signup', {...options});
    }
}

export { SigninPageAPI, SignupPageAPI }
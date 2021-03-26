import { HTTPTransport } from '../utils/xhr/xhr.js'
import { BaseAPI} from "./base-api.js";

let options = {
    headers: {
        'Content-Type': 'application/json'
    }
}

let signAPIInstance = new HTTPTransport();

class SigninPageAPI extends BaseAPI {
    create(data) {
        // Здесь уже не нужно писать полный путь /api/v1/chats/
        return signAPIInstance.post('/', {...options, data});
    }

    request() {
        // Здесь уже не нужно писать полный путь /api/v1/chats/
        return signAPIInstance.get('/', {...options});
    }
}

class SignupPageAPI extends BaseAPI {
    create(data) {
        // Здесь уже не нужно писать полный путь /api/v1/chats/
        return signAPIInstance.post('/signup', {...options, data});
    }

    request() {
        // Здесь уже не нужно писать полный путь /api/v1/chats/
        return signAPIInstance.get('/signup', {...options});
    }
}

export { SigninPageAPI, SignupPageAPI }
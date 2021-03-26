import { HTTPTransport } from '../utils/xhr/xhr.js';
import { BaseAPI } from "./base-api.js";
let options = {
    headers: {
        'Content-Type': 'application/json'
    }
};
let signAPIInstance = new HTTPTransport();
class SigninPageAPI extends BaseAPI {
    create(data) {
        // Здесь уже не нужно писать полный путь /api/v1/chats/
        return signAPIInstance.post('/', Object.assign(Object.assign({}, options), { data }));
    }
    request() {
        // Здесь уже не нужно писать полный путь /api/v1/chats/
        return signAPIInstance.get('/', Object.assign({}, options));
    }
}
class SignupPageAPI extends BaseAPI {
    create(data) {
        // Здесь уже не нужно писать полный путь /api/v1/chats/
        return signAPIInstance.post('/signup', Object.assign(Object.assign({}, options), { data }));
    }
    request() {
        // Здесь уже не нужно писать полный путь /api/v1/chats/
        return signAPIInstance.get('/signup', Object.assign({}, options));
    }
}
export { SigninPageAPI, SignupPageAPI };
//# sourceMappingURL=pages.api.js.map
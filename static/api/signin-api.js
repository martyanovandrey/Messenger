// chat-api.js
import { HTTPTransport } from '../utils/xhr/xhr.js';
import { BaseAPI } from "./base-api.js";
console.log('im loadded');
let options = {
    headers: {
        'Content-Type': 'application/json'
    }
};
let signinAPIInstance = new HTTPTransport();
class SigninAPI extends BaseAPI {
    create(data) {
        // Здесь уже не нужно писать полный путь /api/v1/chats/
        return signinAPIInstance.post('/api/v1/auth/signin', Object.assign(Object.assign({}, options), { data }));
    }
    request() {
        // Здесь уже не нужно писать полный путь /api/v1/chats/
        return signinAPIInstance.get('/api/v1/auth/signin', Object.assign({}, options));
    }
}
let signupAPIInstance = new HTTPTransport();
class SignupAPI extends BaseAPI {
    create(data) {
        // Здесь уже не нужно писать полный путь /api/v1/chats/
        return signupAPIInstance.post('/api/v1/auth/signup', Object.assign(Object.assign({}, options), { data }));
    }
    request() {
        // Здесь уже не нужно писать полный путь /api/v1/chats/
        return signupAPIInstance.get('/api/v1/auth/signup', Object.assign({}, options));
    }
}
export { SigninAPI, SignupAPI };
//# sourceMappingURL=signin-api.js.map
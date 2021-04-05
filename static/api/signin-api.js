// chat-api.js
import { HTTPTransport } from '../utils/xhr/xhr.js';
import { BaseAPI } from './base-api.js';
const options = {
    headers: {
        'Content-Type': 'application/json',
    },
};
const signinAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth');
class SigninAPI extends BaseAPI {
    create(data) {
        return signinAPIInstance.post('/signin', Object.assign(Object.assign({}, options), { data }));
    }
    request() {
        return signinAPIInstance.get('/signin', Object.assign({}, options));
    }
}
const signupAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth');
class SignupAPI extends BaseAPI {
    create(data) {
        return signupAPIInstance.post('/signup', Object.assign(Object.assign({}, options), { data }));
    }
    request() {
        return signupAPIInstance.get('/signup', Object.assign({}, options));
    }
}
const logoutAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth');
class LogoutAPI extends BaseAPI {
    create(data) {
        return signupAPIInstance.post('/logout', Object.assign(Object.assign({}, options), { data }));
    }
}
const userAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth');
class UserAPI extends BaseAPI {
    request() {
        return userAPIInstance.get('/user', Object.assign({}, options));
    }
}
export { SigninAPI, SignupAPI, LogoutAPI, UserAPI, };
//# sourceMappingURL=signin-api.js.map
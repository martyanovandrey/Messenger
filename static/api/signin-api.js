// chat-api.js
import { HTTPTransport } from '../utils/xhr/xhr.js';
import { BaseAPI } from "./base-api.js";
let options = {
    headers: {
        'Content-Type': 'application/json'
    }
};
let signinAPIInstance = new HTTPTransport('/api/v1/auth');
class SigninAPI extends BaseAPI {
    create(data) {
        return signinAPIInstance.post('/signin', Object.assign(Object.assign({}, options), { data }));
    }
    request() {
        return signinAPIInstance.get('/signin', Object.assign({}, options));
    }
}
let signupAPIInstance = new HTTPTransport('/api/v1/auth');
class SignupAPI extends BaseAPI {
    create(data) {
        return signupAPIInstance.post('/signup', Object.assign(Object.assign({}, options), { data }));
    }
    request() {
        return signupAPIInstance.get('/signup', Object.assign({}, options));
    }
}
export { SigninAPI, SignupAPI };
//# sourceMappingURL=signin-api.js.map
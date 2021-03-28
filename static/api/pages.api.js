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
        return signAPIInstance.post('/', Object.assign(Object.assign({}, options), { data }));
    }
    request() {
        return signAPIInstance.get('/', Object.assign({}, options));
    }
}
class SignupPageAPI extends BaseAPI {
    create(data) {
        return signAPIInstance.post('/signup', Object.assign(Object.assign({}, options), { data }));
    }
    request() {
        return signAPIInstance.get('/signup', Object.assign({}, options));
    }
}
export { SigninPageAPI, SignupPageAPI };
//# sourceMappingURL=pages.api.js.map
// chat-api.js
import { HTTPTransport } from '../utils/xhr/xhr.js'
import { BaseAPI} from "./base-api.js";

let options = {
    headers: {
        'Content-Type': 'application/json'
    }
}

let signinAPIInstance = new HTTPTransport('/api/v2/auth');

class SigninAPI extends BaseAPI {
    create(data:string): Promise<XMLHttpRequest> {
        return signinAPIInstance.post('/signin', {...options, data});
    }

    request() {
        return signinAPIInstance.get('/signin', {...options});
    }

}

let signupAPIInstance = new HTTPTransport('/api/v2/auth');

class SignupAPI extends BaseAPI {
    create(data:string): Promise<XMLHttpRequest> {
        //добавил комментарий в readme
        return signupAPIInstance.post('/signup', {...options, data});
    }

    request() {
        return signupAPIInstance.get('/signup', {...options});
    }
}

export { SigninAPI, SignupAPI }
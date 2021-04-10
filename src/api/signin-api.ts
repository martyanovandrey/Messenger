// chat-api.js
import { HTTPTransport } from '../utils/xhr/xhr';
import { BaseAPI } from './base-api';

const options = {
    headers: {
        'Content-Type': 'application/json',
    },
};

const authAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth');

class SigninAPI extends BaseAPI {
    create(data:string): Promise<XMLHttpRequest> {
        return authAPIInstance.post('/signin', { ...options, data });
    }

    request() {
        return authAPIInstance.get('/signin', { ...options });
    }
}

class SignupAPI extends BaseAPI {
    create(data:string): Promise<XMLHttpRequest> {
        return authAPIInstance.post('/signup', { ...options, data });
    }

    request() {
        return authAPIInstance.get('/signup', { ...options });
    }
}

class LogoutAPI extends BaseAPI {
    create(data?:string): Promise<XMLHttpRequest> {
        return authAPIInstance.post('/logout', { ...options, data });
    }
}

class UserAPI extends BaseAPI {
    request(): Promise<XMLHttpRequest> {
        return authAPIInstance.get('/user', { ...options });
    }
}

export {
    SigninAPI, SignupAPI, LogoutAPI, UserAPI,
};

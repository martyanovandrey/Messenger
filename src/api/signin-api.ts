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
  create(data:string): Promise<XMLHttpRequest> {
    return signinAPIInstance.post('/signin', { ...options, data });
  }

  request() {
    return signinAPIInstance.get('/signin', { ...options });
  }
}

const signupAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth');

class SignupAPI extends BaseAPI {
  create(data:string): Promise<XMLHttpRequest> {
    return signupAPIInstance.post('/signup', { ...options, data });
  }

  request() {
    return signupAPIInstance.get('/signup', { ...options });
  }
}

const logoutAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth');

class LogoutAPI extends BaseAPI {
  create(data:string): Promise<XMLHttpRequest> {
    return signupAPIInstance.post('/logout', { ...options, data });
  }
}

const userAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth');

class UserAPI extends BaseAPI {
  request(): Promise<XMLHttpRequest> {
    return userAPIInstance.get('/user', { ...options });
  }
}

export {
  SigninAPI, SignupAPI, LogoutAPI, UserAPI,
};

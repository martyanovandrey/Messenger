import { HTTPTransport } from '../utils/xhr/xhr.js';
import { BaseAPI } from './base-api.js';

const chatAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2');

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
};

class ChatAPI extends BaseAPI {
  create(data:string): Promise<XMLHttpRequest> {
    return chatAPIInstance.post('/chats', { ...options, data });
  }
    request(): Promise<XMLHttpRequest> {
        return chatAPIInstance.get('/chats', { ...options });
    }
}

class ChatDialogAPI extends BaseAPI {
    create(data:string): Promise<XMLHttpRequest> {
        return chatAPIInstance.post(`/chats/token/${data}`, { ...options});
    }
}

class ChatMembersAPI extends BaseAPI {
    request(data:string): Promise<XMLHttpRequest> {
        return chatAPIInstance.get(`/chats/${data}/users`, { ...options});
    }

    update(data:string): Promise<XMLHttpRequest> {
        return chatAPIInstance.put('/chats/users', { ...options, data});
    }
}

export { ChatAPI, ChatDialogAPI, ChatMembersAPI };

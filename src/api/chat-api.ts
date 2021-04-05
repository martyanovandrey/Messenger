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

export { ChatAPI };

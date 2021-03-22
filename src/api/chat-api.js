// chat-api.js
import {HTTPTransport} from '../utils/xhr/xhr.js'
import { BaseAPI } from './base-api.js';

const chatAPIInstance = new HTTPTransport();

let options = {
    headers: {
        'Content-Type': 'application/json'
    }
}

class ChatAPI extends BaseAPI {
    create(data) {
        // Здесь уже не нужно писать полный путь /api/v1/chats/
        return chatAPIInstance.post('api/v1/chats', {...options, data});
    }

    request() {
        // Здесь уже не нужно писать полный путь /api/v1/chats/
        return chatAPIInstance.get('/full');
    }
}

export { ChatAPI }

// chat-messages-api.js
/*
const chatMessagesAPIInstance = new HTTP('api/v1/messages');

class ChatMessagesAPI extends BaseAPI {
    request({id}) {
        return chatMessagesAPIInstance.get(`/${id}`);
    }
}*/


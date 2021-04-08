import { HTTPTransport } from '../utils/xhr/xhr.js';
import { BaseAPI } from './base-api.js';
const chatAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2');
const options = {
    headers: {
        'Content-Type': 'application/json',
    },
};
class ChatAPI extends BaseAPI {
    create(data) {
        return chatAPIInstance.post('/chats', Object.assign(Object.assign({}, options), { data }));
    }
    request() {
        return chatAPIInstance.get('/chats', Object.assign({}, options));
    }
}
class ChatDialogAPI extends BaseAPI {
    create(data) {
        return chatAPIInstance.post(`/chats/token/${data}`, Object.assign({}, options));
    }
}
class ChatMembersAPI extends BaseAPI {
    request(data) {
        return chatAPIInstance.get(`/chats/${data}/users`, Object.assign({}, options));
    }
    update(data) {
        return chatAPIInstance.put('/chats/users', Object.assign(Object.assign({}, options), { data }));
    }
}
export { ChatAPI, ChatDialogAPI, ChatMembersAPI };
//# sourceMappingURL=chat-api.js.map
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
export { ChatAPI };
//# sourceMappingURL=chat-api.js.map
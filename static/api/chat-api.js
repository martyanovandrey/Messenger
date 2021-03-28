import { HTTPTransport } from '../utils/xhr/xhr.js';
import { BaseAPI } from './base-api.js';
const chatAPIInstance = new HTTPTransport('api/v1/chats');
let options = {
    headers: {
        'Content-Type': 'application/json'
    }
};
class ChatAPI extends BaseAPI {
    create(data) {
        return chatAPIInstance.post('/', Object.assign(Object.assign({}, options), { data }));
    }
}
export { ChatAPI };
//# sourceMappingURL=chat-api.js.map
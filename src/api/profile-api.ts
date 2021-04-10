import { HTTPTransport } from '../utils/xhr/xhr';
import { BaseAPI } from './base-api';

const options = {
    headers: {
        'Content-Type': 'application/json',
    },
};

const profileApi = new HTTPTransport('https://ya-praktikum.tech/api/v2/user');
class ProfileChangeAPI extends BaseAPI {
    update(data:any): Promise<XMLHttpRequest> {
    // добавил комментарий в readme
        return profileApi.put('/profile', { ...options, data });
    }
}

class ProfileChangePswAPI extends BaseAPI {
    update(data:any): Promise<XMLHttpRequest> {
        return profileApi.put('/password', { ...options, data });
    }
}

class getUserAPI extends BaseAPI {
    create(data:any): Promise<XMLHttpRequest> {
        return profileApi.post('/search', { ...options, data });
    }
}

export { ProfileChangeAPI, ProfileChangePswAPI, getUserAPI };

// base-api.js
export abstract class BaseAPI {
    // Абстрактным не делаю все методы, потому что не все их реализую
    create(_data:string): Promise<XMLHttpRequest> { throw new Error('Not implemented'); }

    request(_data?:any): Promise<XMLHttpRequest> { throw new Error('Not implemented'); }

    update(_data:any): Promise<XMLHttpRequest> { throw new Error('Not implemented'); }

    delete(_data?:any): Promise<XMLHttpRequest> { throw new Error('Not implemented'); }
}

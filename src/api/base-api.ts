// base-api.js
export abstract class BaseAPI {
  // Абстрактным не делаю все методы, потому что не все их реализую
  create(_data:string): Promise<XMLHttpRequest> { throw new Error('Not implemented'); }

  request(): Promise<XMLHttpRequest> { throw new Error('Not implemented'); }

  update(_data:string): Promise<XMLHttpRequest> { throw new Error('Not implemented'); }

  delete(): Promise<XMLHttpRequest> { throw new Error('Not implemented'); }
}

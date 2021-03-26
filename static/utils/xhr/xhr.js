import { queryString } from '../queryString/queryString.js';
export { HTTPTransport, queryString, METHODS };
const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT'
};
class HTTPTransport {
    constructor() {
        this.get = (url, options = {}) => {
            options.data = queryString(options.data);
            url = url + '/' + options.data;
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.GET }), options.timeout);
        };
        this.post = (url, options = {}) => {
            //options.data = queryString(options.data)
            //url = url + options.data
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.POST }), options.timeout);
        };
        this.put = (url, options = {}) => {
            //options.data = queryString(options.data)
            //url = url + options.data
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.PUT }), options.timeout);
        };
        // PUT, POST, DELETE
        // options:
        // headers — obj
        // data — obj
        this.request = (url, options, timeout = 5000) => {
            const { method, data, headers } = options;
            //data = queryStringify(data)
            return new Promise((resolve, reject) => {
                //options.data = queryStringify(data)
                const xhr = new XMLHttpRequest();
                xhr.open(method, url);
                xhr.setRequestHeader(Object.keys(headers)[0], Object.values(headers)[0]);
                xhr.withCredentials = true;
                xhr.onload = function () {
                    resolve(xhr);
                };
                xhr.timeout = timeout;
                xhr.onabort = reject;
                xhr.onerror = reject;
                xhr.ontimeout = reject;
                console.log(data);
                if (method === METHODS.GET || !data) {
                    xhr.send();
                }
                else {
                    xhr.send(data);
                }
            });
        };
    }
}
//# sourceMappingURL=xhr.js.map
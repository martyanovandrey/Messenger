import { queryString } from '../../../static/utils/queryString/queryString.js';
export { HTTPTransport, queryString, METHODS };
const METHODS = {
    GET: 'GET',
};
class HTTPTransport {
    constructor() {
        this.get = (url, options = {}) => {
            options.data = queryString(options.data);
            url = url + options.data;
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.GET }), options.timeout);
        };
        // PUT, POST, DELETE
        // options:
        // headers — obj
        // data — obj
        this.request = (url, options, timeout = 5000) => {
            const { method, body, headers } = options;
            //data = queryStringify(data)
            return new Promise((resolve, reject) => {
                //options.data = queryStringify(data)
                const xhr = new XMLHttpRequest();
                xhr.open(method, url);
                xhr.setRequestHeader(headers);
                xhr.withCredentials = true;
                xhr.onload = function () {
                    resolve(xhr);
                };
                xhr.timeout = timeout;
                xhr.onabort = reject;
                xhr.onerror = reject;
                xhr.ontimeout = reject;
                if (method === METHODS.GET || !body) {
                    xhr.send();
                }
                else {
                    xhr.send(body);
                }
            });
        };
    }
}
//# sourceMappingURL=xhr.js.map
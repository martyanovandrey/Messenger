import { queryString } from '../queryString/queryString.js';
export { HTTPTransport, queryString, METHOD };
var METHOD;
(function (METHOD) {
    METHOD["GET"] = "GET";
    METHOD["POST"] = "POST";
    METHOD["PUT"] = "PUT";
    METHOD["DELETE"] = "DELETE";
})(METHOD || (METHOD = {}));
;
class HTTPTransport {
    constructor(baseUrl) {
        this.get = (url, options = {}) => {
            options.data = queryString(options.data);
            url = url + '/' + options.data;
            return this.request(this.baseUrl + url, Object.assign(Object.assign({}, options), { method: METHOD.GET }));
        };
        this.post = (url, options = {}) => {
            return this.request(this.baseUrl + url, Object.assign(Object.assign({}, options), { method: METHOD.POST }));
        };
        this.put = (url, options = {}) => {
            console.log((this.baseUrl + url), 'URL TEST !!');
            return this.request(this.baseUrl + url, Object.assign(Object.assign({}, options), { method: METHOD.PUT }));
        };
        this.delete = (url, options = {}) => {
            return this.request(this.baseUrl + url, Object.assign(Object.assign({}, options), { method: METHOD.DELETE }));
        };
        this.baseUrl = baseUrl;
    }
    request(url, options = { method: METHOD.GET }) {
        const { method, data, headers } = options;
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.setRequestHeader(Object.keys(headers)[0], headers[Object.keys(headers)[0]]);
            xhr.withCredentials = true;
            xhr.onload = function () {
                resolve(xhr);
            };
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;
            console.log(data);
            if (method === METHOD.GET || !data) {
                xhr.send();
            }
            else {
                xhr.send(data);
            }
        });
    }
    ;
}
//# sourceMappingURL=xhr.js.map
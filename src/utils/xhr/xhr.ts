import { queryString } from '../queryString/queryString';

export { HTTPTransport, queryString, METHOD };

enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

type Options = {
    method: METHOD;
    data?: any;
    headers?: any;
};
type OptionsWithoutMethod = Omit<Options, 'method'>;

class HTTPTransport {
    private baseUrl?: string;

    constructor(baseUrl?: string) {
        this.baseUrl = baseUrl;
    }

    get = (url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> =>
    // options.data = queryString(options.data);
    // url = `${url}/${options.data}`;
        this.request(this.baseUrl + url, { ...options, method: METHOD.GET })
    ;

    // eslint-disable-next-line max-len
    post = (url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> => this.request(this.baseUrl + url, { ...options, method: METHOD.POST });

    // eslint-disable-next-line max-len
    put = (url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> => this.request(this.baseUrl + url, { ...options, method: METHOD.PUT });

    // eslint-disable-next-line max-len
    delete = (url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> => this.request(this.baseUrl + url, { ...options, method: METHOD.DELETE });

    request(url: string, options: Options = { method: METHOD.GET }): Promise<XMLHttpRequest> {
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
            if (method === METHOD.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    }
}

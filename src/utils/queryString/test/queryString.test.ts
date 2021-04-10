// @ts-ignore
import assert = require("assert")
import { queryString } from '../queryString';

describe('queryString', () => {
    it('queryString should return url', () => {
        const data = {
            key: 1,
            key2: 'test',
            key3: false,
            key4: true,
            key5: [1, 2, 3],
            key6: { a: 1 },
            key7: { b: { d: 2 } },
        };
        const result = queryString(data);
        assert.equal(result, 'key=1&key2=test&key3=false&key4=true&key5[0]=1&key5[1]=2&key5[2]=3&key6[a]=1&key7[b][d]=2');
    });
});

describe('queryString', () => {
    it('queryString should encode URI', () => {
        const data = { key: '/ho /ho' };
        const result = queryString(data);
        assert.equal(result, 'key=%2Fho%20%2Fho');
    });
});

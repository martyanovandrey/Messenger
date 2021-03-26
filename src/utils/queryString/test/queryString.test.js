import assert from 'assert'
import {queryString} from "../../../../static/utils/queryString/queryString.js"

describe('queryString', () => {
    it('queryString should return url', () => {
        let data = {
            key: 1,
            key2: "test",
            key3: false,
            key4: true,
            key5: [1, 2, 3],
            key6: { a: 1 },
            key7: { b: { d: 2 } }
        };
        let result = queryString(data)
        assert.equal(result, "key=1&key2=test&key3=false&key4=true&key5[0]=1&key5[1]=2&key5[2]=3&key6[a]=1&key7[b][d]=2")
    })
})

describe('queryString', () => {
    it('queryString should encode URI', () => {
        let data = {key: "/ho /ho"}
        let result = queryString(data)
        assert.equal(result, "key=%2Fho%20%2Fho")
    })
})

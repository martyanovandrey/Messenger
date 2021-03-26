function cloneDeep(obj) {
    if (isObject(obj)) {
        const res = {}
        for (const i in obj) {
            if (isObject(obj[i])){
                res[i] = cloneDeep(obj[i])
                continue;
            }
            res[i] = obj[i]
        }
        return res
    } else if (isArray(obj)) {
        const res = []
        obj.forEach((value, i) => {
            if (isObject(value)) {
                console.log(value, i)
                res[i] = cloneDeep(value)
                return
            }
            res[i] = value
        })
        return res
    }
}

function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}
function isArray(value: unknown): value is [] {
    return Array.isArray(value);
}

export default cloneDeep

const objects = [{ 'a': 1 }, { 'b': 2 }];
const deep = cloneDeep(objects);

console.log(deep[0] === objects[0]); // => false
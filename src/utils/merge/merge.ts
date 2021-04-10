type Indexed<T = unknown> = {
    [key in string]: T;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
    const output = { ...lhs };
    if (isObject(lhs) && isObject(rhs)) {
        Object.keys(rhs).forEach((key) => {
            if (isObject(rhs[key])) {
                if (!(key in lhs)) {
                    Object.assign(output, { [key]: rhs[key] });
                } else { // @ts-ignore
                    output[key] = merge(lhs[key], rhs[key]);
                }
            } else {
                Object.assign(output, { [key]: rhs[key] });
            }
        });
    }
    return output;
}

function isObject(item: any) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

export default merge;

merge({ a: { b: { a: 2 } }, d: 5 }, { a: { b: { c: 1 } } });

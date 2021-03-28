"use strict";
exports.__esModule = true;
exports.queryString = exports.getParams = exports.getKey = exports.isArrayOrObject = exports.isArray = exports.isPlainObject = void 0;
function isPlainObject(value) {
    return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}
exports.isPlainObject = isPlainObject;
function isArray(value) {
    return Array.isArray(value);
}
exports.isArray = isArray;
function isArrayOrObject(value) {
    return isPlainObject(value) || isArray(value);
}
exports.isArrayOrObject = isArrayOrObject;
function getKey(key, parentKey) {
    return parentKey ? parentKey + "[" + key + "]" : key;
}
exports.getKey = getKey;
function getParams(data, parentKey) {
    var result = [];
    for (var _i = 0, _a = Object.entries(data); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        if (isArrayOrObject(value)) {
            result.push.apply(result, getParams(value, getKey(key, parentKey)));
        }
        else {
            result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
        }
    }
    return result;
}
exports.getParams = getParams;
function queryString(data) {
    if (!isPlainObject(data)) {
        throw new Error('input must be an object');
    }
    return getParams(data).map(function (arr) { return arr.join('='); }).join('&');
}
exports.queryString = queryString;

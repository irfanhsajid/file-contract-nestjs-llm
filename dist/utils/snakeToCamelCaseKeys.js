"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.snakeToCamelCaseKeys = snakeToCamelCaseKeys;
function snakeToCamelCase(str) {
    if (str === '_id') {
        return str;
    }
    if (!/[_]/.test(str) && /^[a-z]/.test(str)) {
        return str;
    }
    return str
        .toLowerCase()
        .split('_')
        .map((word, i) => (i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
        .join('');
}
function isObjectId(value) {
    return (value !== null &&
        typeof value === 'object' &&
        ((value.constructor && value.constructor.name === 'ObjectId') ||
            (typeof value === 'object' &&
                'toString' in value &&
                typeof value.toString === 'function' &&
                '_bsontype' in value &&
                value._bsontype === 'ObjectID')));
}
function snakeToCamelCaseKeys(input) {
    if (input === null || input === undefined) {
        return input;
    }
    if (Array.isArray(input)) {
        return input.map((item) => typeof item === 'object' && item !== null ? snakeToCamelCaseKeys(item) : item);
    }
    if (input instanceof Date) {
        return input;
    }
    if (typeof input !== 'object') {
        return input;
    }
    if (isObjectId(input)) {
        return input;
    }
    const result = {};
    for (const [key, value] of Object.entries(input)) {
        const camelKey = snakeToCamelCase(key);
        if (Array.isArray(value)) {
            result[camelKey] = value.map((item) => typeof item === 'object' && item !== null ? snakeToCamelCaseKeys(item) : item);
        }
        else if (typeof value === 'object' && value !== null) {
            if (value instanceof Date) {
                result[camelKey] = value;
            }
            else if (isObjectId(value)) {
                result[camelKey] = value;
            }
            else {
                result[camelKey] = snakeToCamelCaseKeys(value);
            }
        }
        else {
            result[camelKey] = value;
        }
    }
    return result;
}
//# sourceMappingURL=snakeToCamelCaseKeys.js.map
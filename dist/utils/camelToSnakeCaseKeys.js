"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelToSnakeCaseKeys = camelToSnakeCaseKeys;
exports.toSnakeCase = toSnakeCase;
exports.toSnakeCaseKeys = toSnakeCaseKeys;
function camelToSnakeCase(str) {
    if (str === '_id') {
        return str;
    }
    return str
        .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
        .toLowerCase();
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
function camelToSnakeCaseKeys(input) {
    if (input === null || input === undefined) {
        return input;
    }
    if (Array.isArray(input)) {
        return input.map((item) => typeof item === 'object' && item !== null ? camelToSnakeCaseKeys(item) : item);
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
        const snakeKey = camelToSnakeCase(key);
        if (Array.isArray(value)) {
            result[snakeKey] = value.map((item) => typeof item === 'object' && item !== null ? camelToSnakeCaseKeys(item) : item);
        }
        else if (typeof value === 'object' && value !== null) {
            if (value instanceof Date) {
                result[snakeKey] = value;
            }
            else if (isObjectId(value)) {
                result[snakeKey] = value;
            }
            else {
                result[snakeKey] = camelToSnakeCaseKeys(value);
            }
        }
        else {
            result[snakeKey] = value;
        }
    }
    return result;
}
function toSnakeCase(str) {
    if (str === '_id') {
        return str;
    }
    return str
        .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
        .replace(/[\s-]+/g, '_')
        .toLowerCase();
}
function toSnakeCaseKeys(input) {
    if (input === null || input === undefined) {
        return input;
    }
    if (Array.isArray(input)) {
        return input.map((item) => typeof item === 'object' && item !== null ? toSnakeCaseKeys(item) : item);
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
        const snakeKey = toSnakeCase(key);
        if (Array.isArray(value)) {
            result[snakeKey] = value.map((item) => typeof item === 'object' && item !== null ? toSnakeCaseKeys(item) : item);
        }
        else if (typeof value === 'object' && value !== null) {
            if (value instanceof Date) {
                result[snakeKey] = value;
            }
            else if (isObjectId(value)) {
                result[snakeKey] = value;
            }
            else {
                result[snakeKey] = toSnakeCaseKeys(value);
            }
        }
        else {
            result[snakeKey] = value;
        }
    }
    return result;
}
//# sourceMappingURL=camelToSnakeCaseKeys.js.map
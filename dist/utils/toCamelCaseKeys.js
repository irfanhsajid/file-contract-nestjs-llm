"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCamelCaseKeys = void 0;
function toCamelCase(str) {
    return str
        .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
        .replace(/[\s-_]+/g, '_')
        .toLowerCase()
        .split('_')
        .map((word, i) => (i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
        .join('');
}
const toCamelCaseKeys = (input) => {
    const result = {};
    for (const [key, value] of Object.entries(input)) {
        const camelKey = toCamelCase(key);
        if (Array.isArray(value)) {
            result[camelKey] = value.map((item) => typeof item === 'object' && item !== null ? (0, exports.toCamelCaseKeys)(item) : item);
        }
        else if (typeof value === 'object' && value !== null) {
            result[camelKey] = (0, exports.toCamelCaseKeys)(value);
        }
        else {
            result[camelKey] = value;
        }
    }
    return result;
};
exports.toCamelCaseKeys = toCamelCaseKeys;
//# sourceMappingURL=toCamelCaseKeys.js.map
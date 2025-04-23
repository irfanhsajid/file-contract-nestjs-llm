/**
 * Converts a string from snake_case to camelCase
 * @param str - The string to convert
 * @returns The camelCase version of the string or the original string if already in camelCase
 */
function snakeToCamelCase(str: string): string {
  // Special case - preserve "_id" as is
  if (str === '_id') {
    return str;
  }

  // If there are no underscores and the first character is lowercase,
  // we can consider it's already in camelCase format
  if (!/[_]/.test(str) && /^[a-z]/.test(str)) {
    return str;
  }

  return str
    .toLowerCase()
    .split('_')
    .map((word, i) => (i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join('');
}

/**
 * Check if an object is a MongoDB ObjectId
 * @param value - The value to check
 * @returns True if the value appears to be a MongoDB ObjectId
 */
function isObjectId(value: any): boolean {
  return (
    value !== null &&
    typeof value === 'object' &&
    // Check for ObjectId based on object structure
    ((value.constructor && value.constructor.name === 'ObjectId') ||
      // Safe check for _bsontype property
      (typeof value === 'object' &&
        'toString' in value &&
        typeof value.toString === 'function' &&
        '_bsontype' in value &&
        value._bsontype === 'ObjectID'))
  );
}

/**
 * Recursively converts all keys in an object (or array) from snake_case to camelCase
 * while preserving "_id" keys and keys already in camelCase as they are
 * @param input - The object to convert
 * @returns A new object with camelCase keys
 */
export function snakeToCamelCaseKeys<T>(input: T): any {
  // Handle null or undefined input
  if (input === null || input === undefined) {
    return input;
  }

  // Handle array input
  if (Array.isArray(input)) {
    return input.map((item) =>
      typeof item === 'object' && item !== null ? snakeToCamelCaseKeys(item) : item,
    );
  }

  // Handle date objects
  if (input instanceof Date) {
    return input;
  }

  // Handle non-object types
  if (typeof input !== 'object') {
    return input;
  }

  // Handle special MongoDB ObjectId case
  if (isObjectId(input)) {
    return input;
  }

  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(input)) {
    const camelKey = snakeToCamelCase(key);

    if (Array.isArray(value)) {
      result[camelKey] = value.map((item) =>
        typeof item === 'object' && item !== null ? snakeToCamelCaseKeys(item) : item,
      );
    } else if (typeof value === 'object' && value !== null) {
      // Check for Date objects
      if (value instanceof Date) {
        result[camelKey] = value;
      } else if (isObjectId(value)) {
        result[camelKey] = value;
      } else {
        result[camelKey] = snakeToCamelCaseKeys(value);
      }
    } else {
      result[camelKey] = value;
    }
  }

  return result;
}

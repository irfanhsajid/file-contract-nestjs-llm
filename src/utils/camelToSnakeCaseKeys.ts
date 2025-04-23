/**
 * Converts a string from camelCase to snake_case
 * @param str - The string to convert
 * @returns The snake_case version of the string
 */
function camelToSnakeCase(str: string): string {
  // Special case - preserve "_id" as is
  if (str === '_id') {
    return str;
  }

  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2') // Insert underscore before capital letters
    .toLowerCase(); // Convert everything to lowercase
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
 * Recursively converts all keys in an object (or array) from camelCase to snake_case
 * while preserving "_id" keys as they are
 * @param input - The object to convert
 * @returns A new object with snake_case keys
 */
export function camelToSnakeCaseKeys<T>(input: T): any {
  // Handle null or undefined input
  if (input === null || input === undefined) {
    return input;
  }

  // Handle array input
  if (Array.isArray(input)) {
    return input.map((item) =>
      typeof item === 'object' && item !== null ? camelToSnakeCaseKeys(item) : item,
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
    const snakeKey = camelToSnakeCase(key);

    if (Array.isArray(value)) {
      result[snakeKey] = value.map((item) =>
        typeof item === 'object' && item !== null ? camelToSnakeCaseKeys(item) : item,
      );
    } else if (typeof value === 'object' && value !== null) {
      // Check for Date objects
      if (value instanceof Date) {
        result[snakeKey] = value;
      } else if (isObjectId(value)) {
        result[snakeKey] = value;
      } else {
        result[snakeKey] = camelToSnakeCaseKeys(value);
      }
    } else {
      result[snakeKey] = value;
    }
  }

  return result;
}

/**
 * Converts a string from any format to snake_case
 * @param str - The string to convert
 * @returns The snake_case version of the string
 */
export function toSnakeCase(str: string): string {
  // Special case - preserve "_id" as is
  if (str === '_id') {
    return str;
  }

  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2') // Split camelCase
    .replace(/[\s-]+/g, '_') // Convert spaces and hyphens to underscores
    .toLowerCase(); // Convert to lowercase
}

/**
 * Recursively converts all keys in an object (or array) to snake_case from any format
 * while preserving "_id" keys as they are
 * @param input - The object to convert
 * @returns A new object with snake_case keys
 */
export function toSnakeCaseKeys<T>(input: T): any {
  // Handle null or undefined input
  if (input === null || input === undefined) {
    return input;
  }

  // Handle array input
  if (Array.isArray(input)) {
    return input.map((item) =>
      typeof item === 'object' && item !== null ? toSnakeCaseKeys(item) : item,
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
    const snakeKey = toSnakeCase(key);

    if (Array.isArray(value)) {
      result[snakeKey] = value.map((item) =>
        typeof item === 'object' && item !== null ? toSnakeCaseKeys(item) : item,
      );
    } else if (typeof value === 'object' && value !== null) {
      // Check for Date objects
      if (value instanceof Date) {
        result[snakeKey] = value;
      } else if (isObjectId(value)) {
        result[snakeKey] = value;
      } else {
        result[snakeKey] = toSnakeCaseKeys(value);
      }
    } else {
      result[snakeKey] = value;
    }
  }

  return result;
}

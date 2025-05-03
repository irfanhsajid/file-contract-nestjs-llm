/**
 * Converts a string like "User Name", "user_name", "user-id", "UserID" to camelCase
 */
function toCamelCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2') // Split camelCase or PascalCase
    .replace(/[\s-_]+/g, '_') // Normalize separators to underscore
    .toLowerCase()
    .split('_')
    .map((word, i) => (i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join('');
}

interface SimpleObject {
  [key: string]: string | number | boolean | null | undefined | SimpleObject | SimpleObject[];
}

/**
 * Recursively converts all keys in an object (or array) to camelCase
 */
export const toCamelCaseKeys = <T extends SimpleObject>(input: T): Record<string, unknown> => {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(input)) {
    const camelKey = toCamelCase(key);
    if (Array.isArray(value)) {
      result[camelKey] = value.map((item) =>
        typeof item === 'object' && item !== null ? toCamelCaseKeys(item) : item,
      );
    } else if (typeof value === 'object' && value !== null) {
      result[camelKey] = toCamelCaseKeys(value);
    } else {
      result[camelKey] = value;
    }
  }

  return result;
};

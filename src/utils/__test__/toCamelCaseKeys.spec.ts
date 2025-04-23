import { toCamelCaseKeys } from '../toCamelCaseKeys';

describe('toCamelCaseKeys', () => {
  it('should convert object keys to camelCase', () => {
    const input = {
      user_name: 'John Doe',
      'user-id': 123,
      'User Address': [
        {
          street_name: 'Main St',
          'zip-code': '12345',
        },
      ],
    };

    const expected = {
      userName: 'John Doe',
      userId: 123,
      userAddress: [
        {
          streetName: 'Main St',
          zipCode: '12345',
        },
      ],
    };

    expect(toCamelCaseKeys(input)).toEqual(expected);
  });

  it('should handle arrays of objects', () => {
    const input = {
      users_list: [
        { user_name: 'John Doe', 'user-id': 123 },
        { user_name: 'Jane Doe', 'user-id': 456 },
      ],
    };

    const expected = {
      usersList: [
        { userName: 'John Doe', userId: 123 },
        { userName: 'Jane Doe', userId: 456 },
      ],
    };

    expect(toCamelCaseKeys(input)).toEqual(expected);
  });

  it('should handle primitive values', () => {
    const input = {
      user_name: 'John Doe',
      age: 30,
      is_active: true,
    };

    const expected = {
      userName: 'John Doe',
      age: 30,
      isActive: true,
    };

    expect(toCamelCaseKeys(input)).toEqual(expected);
  });

  it('should handle null and undefined values', () => {
    const input = {
      user_name: null,
      'user-id': undefined,
    };

    const expected = {
      userName: null,
      userId: undefined,
    };

    expect(toCamelCaseKeys(input)).toEqual(expected);
  });

  it('should handle empty objects and arrays', () => {
    const input = {
      empty_object: {},
      empty_array: [],
    };

    const expected = {
      emptyObject: {},
      emptyArray: [],
    };

    expect(toCamelCaseKeys(input)).toEqual(expected);
  });
});

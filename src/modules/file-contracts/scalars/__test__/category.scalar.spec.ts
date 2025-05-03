import { Kind } from 'graphql';
import { allowedCategories, CategoryScalar } from '../category.scalar';

describe('CategoryScalar', () => {
  const scalar = new CategoryScalar();

  describe('parseValue', () => {
    it('should return the value if it is a valid category', () => {
      allowedCategories.forEach((category) => {
        expect(scalar.parseValue(category)).toBe(category);
      });
    });

    it('should throw an error if the value is not a valid category', () => {
      expect(() => scalar.parseValue('InvalidCategory')).toThrowError(
        'Invalid category: InvalidCategory',
      );
    });
  });

  describe('serialize', () => {
    it('should return the value as is', () => {
      allowedCategories.forEach((category) => {
        expect(scalar.serialize(category)).toBe(category);
      });
    });
  });

  describe('parseLiteral', () => {
    it('should return the value if it is a valid category and a string literal', () => {
      allowedCategories.forEach((category) => {
        const ast = { kind: Kind.STRING, value: category };
        expect(scalar.parseLiteral(ast)).toBe(category);
      });
    });

    it('should throw an error if the value is not a valid category', () => {
      const ast = { kind: Kind.STRING, value: 'InvalidCategory' };
      expect(() => scalar.parseLiteral(ast)).toThrowError(
        'Invalid category literal: InvalidCategory',
      );
    });

    it('should throw an error if the AST kind is not a string', () => {
      const ast = { kind: Kind.INT, value: 123 };
      expect(() => scalar.parseLiteral(ast)).toThrowError('Invalid category literal: 123');
    });
  });
});

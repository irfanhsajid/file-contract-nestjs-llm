import { Kind } from 'graphql';
import { allowedProductTypes, ProductTypeScalar } from '../product-type.scalar';

describe('ProductTypeScalar', () => {
  const scalar = new ProductTypeScalar();

  describe('parseValue', () => {
    it('should return the value if it is a valid product type', () => {
      allowedProductTypes.forEach((productType) => {
        expect(scalar.parseValue(productType)).toBe(productType);
      });
    });

    it('should throw an error if the value is not a valid product type', () => {
      expect(() => scalar.parseValue('InvalidProductType')).toThrowError(
        'Invalid product type: InvalidProductType',
      );
    });
  });

  describe('serialize', () => {
    it('should return the value as is', () => {
      allowedProductTypes.forEach((productType) => {
        expect(scalar.serialize(productType)).toBe(productType);
      });
    });
  });

  describe('parseLiteral', () => {
    it('should return the value if it is a valid product type and a string literal', () => {
      allowedProductTypes.forEach((productType) => {
        const ast = { kind: Kind.STRING, value: productType };
        expect(scalar.parseLiteral(ast)).toBe(productType);
      });
    });

    it('should throw an error if the value is not a valid product type', () => {
      const ast = { kind: Kind.STRING, value: 'InvalidProductType' };
      expect(() => scalar.parseLiteral(ast)).toThrowError(
        'Invalid product type literal: InvalidProductType',
      );
    });

    it('should throw an error if the AST kind is not a string', () => {
      const ast = { kind: Kind.INT, value: 123 };
      expect(() => scalar.parseLiteral(ast)).toThrowError('Invalid product type literal: 123');
    });
  });
});

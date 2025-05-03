import { Kind } from 'graphql';
import { allowedEventTypes, EventTypeScalar } from '../event-type.scalar';

describe('EventTypeScalar', () => {
  const scalar = new EventTypeScalar();

  describe('parseValue', () => {
    it('should return the value if it is a valid event type', () => {
      allowedEventTypes.forEach((eventType) => {
        expect(scalar.parseValue(eventType)).toBe(eventType);
      });
    });

    it('should throw an error if the value is not a valid event type', () => {
      expect(() => scalar.parseValue('InvalidEventType')).toThrowError(
        'Invalid eventType: InvalidEventType',
      );
    });
  });

  describe('serialize', () => {
    it('should return the value as is', () => {
      allowedEventTypes.forEach((eventType) => {
        expect(scalar.serialize(eventType)).toBe(eventType);
      });
    });
  });

  describe('parseLiteral', () => {
    it('should return the value if it is a valid event type and a string literal', () => {
      allowedEventTypes.forEach((eventType) => {
        const ast = { kind: Kind.STRING, value: eventType };
        expect(scalar.parseLiteral(ast)).toBe(eventType);
      });
    });

    it('should throw an error if the value is not a valid event type', () => {
      const ast = { kind: Kind.STRING, value: 'InvalidEventType' };
      expect(() => scalar.parseLiteral(ast)).toThrowError(
        'Invalid eventType literal: InvalidEventType',
      );
    });

    it('should throw an error if the AST kind is not a string', () => {
      const ast = { kind: Kind.INT, value: 123 };
      expect(() => scalar.parseLiteral(ast)).toThrowError('Invalid eventType literal: 123');
    });
  });
});

import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind } from 'graphql';

export const allowedProductTypes = ['epic', 'signatera'] as const;

@Scalar('ProductTypeScalar')
export class ProductTypeScalar implements CustomScalar<string, string> {
  description = `
  Allowed product types: ${allowedProductTypes.join(' - ')}
  `;

  parseValue(value: string) {
    if (!allowedProductTypes.includes(value as any)) {
      throw new Error(`Invalid product type: ${value}`);
    }
    return value;
  }

  serialize(value: string) {
    return value;
  }

  parseLiteral(ast: any) {
    if (ast.kind === Kind.STRING && allowedProductTypes.includes(ast.value)) {
      return ast.value;
    }
    throw new Error(`Invalid product type literal: ${ast.value}`);
  }
}

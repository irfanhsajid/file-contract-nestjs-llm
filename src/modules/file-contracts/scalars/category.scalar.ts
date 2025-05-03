import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind } from 'graphql';

export const allowedCategories = [
  'Biomarker',
  'Condition',
  'Outcome',
  'Therapeutic Procedure',
] as const;

@Scalar('CategoryScalar')
export class CategoryScalar implements CustomScalar<string, string> {
  description = `
  Allowed category types: ${allowedCategories.join(' - ')}
  `;
  parseValue(value: string) {
    if (!allowedCategories.includes(value as any)) {
      throw new Error(`Invalid category: ${value}`);
    }
    return value;
  }

  serialize(value: string) {
    return value;
  }

  parseLiteral(ast) {
    if (ast.kind === Kind.STRING && allowedCategories.includes(ast.value)) {
      return ast.value;
    }
    throw new Error(`Invalid category literal: ${ast.value}`);
  }
}

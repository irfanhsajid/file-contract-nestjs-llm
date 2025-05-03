import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind } from 'graphql';

export const allowedEventTypes = [
  'Demographic Data',
  'Cancer Diagnosis',
  'Tumor Metastasis',
  'Group Stage',
  'TNM Stage',
  'Surgery',
  'Cancer Medication',
  'Radiation',
  'Other Procedure',
  'Tumor Response to Therapy',
  'Cancer Outcome',
  'Death',
  'Biomarker',
  'Clinical Follow-Up',
] as const;

@Scalar('EventTypeScalar')
export class EventTypeScalar implements CustomScalar<string, string> {
  description = `
  Allowed event types: ${allowedEventTypes.join(' - ')}
  `;

  parseValue(value: string) {
    if (!allowedEventTypes.includes(value as any)) {
      throw new Error(`Invalid eventType: ${value}`);
    }
    return value;
  }

  serialize(value: string) {
    return value;
  }

  parseLiteral(ast: any) {
    if (ast.kind === Kind.STRING && allowedEventTypes.includes(ast.value)) {
      return ast.value;
    }
    throw new Error(`Invalid eventType literal: ${ast.value}`);
  }
}

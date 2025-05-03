import { CustomScalar } from '@nestjs/graphql';
export declare const allowedCategories: readonly ["Biomarker", "Condition", "Outcome", "Therapeutic Procedure"];
export declare class CategoryScalar implements CustomScalar<string, string> {
    description: string;
    parseValue(value: string): string;
    serialize(value: string): string;
    parseLiteral(ast: any): any;
}

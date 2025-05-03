import { CustomScalar } from '@nestjs/graphql';
export declare const allowedProductTypes: readonly ["epic", "signatera"];
export declare class ProductTypeScalar implements CustomScalar<string, string> {
    description: string;
    parseValue(value: string): string;
    serialize(value: string): string;
    parseLiteral(ast: any): any;
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTypeScalar = exports.allowedProductTypes = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
exports.allowedProductTypes = ['epic', 'signatera'];
let ProductTypeScalar = class ProductTypeScalar {
    constructor() {
        this.description = `
  Allowed product types: ${exports.allowedProductTypes.join(' - ')}
  `;
    }
    parseValue(value) {
        if (!exports.allowedProductTypes.includes(value)) {
            throw new Error(`Invalid product type: ${value}`);
        }
        return value;
    }
    serialize(value) {
        return value;
    }
    parseLiteral(ast) {
        if (ast.kind === graphql_2.Kind.STRING && exports.allowedProductTypes.includes(ast.value)) {
            return ast.value;
        }
        throw new Error(`Invalid product type literal: ${ast.value}`);
    }
};
exports.ProductTypeScalar = ProductTypeScalar;
exports.ProductTypeScalar = ProductTypeScalar = __decorate([
    (0, graphql_1.Scalar)('ProductTypeScalar')
], ProductTypeScalar);
//# sourceMappingURL=product-type.scalar.js.map
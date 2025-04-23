"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLLoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
let GraphQLLoggingInterceptor = class GraphQLLoggingInterceptor {
    constructor() {
        this.logger = new common_1.Logger('GraphQL');
    }
    intercept(context, next) {
        if (context.getType() !== 'graphql') {
            return next.handle();
        }
        try {
            const ctx = graphql_1.GqlExecutionContext.create(context);
            const info = ctx.getInfo();
            const resolverName = info?.parentType?.name || 'UnknownResolver';
            const fieldName = info?.fieldName || 'UnknownField';
            this.logger.log(`${resolverName}.${fieldName} was called`);
        }
        catch (e) {
            this.logger.error('LoggingInterceptor failed:', e);
        }
        return next.handle();
    }
};
exports.GraphQLLoggingInterceptor = GraphQLLoggingInterceptor;
exports.GraphQLLoggingInterceptor = GraphQLLoggingInterceptor = __decorate([
    (0, common_1.Injectable)()
], GraphQLLoggingInterceptor);
//# sourceMappingURL=logging.interceptor.js.map
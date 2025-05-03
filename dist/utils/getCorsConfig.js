"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCorsConfig = void 0;
const getCorsConfig = () => {
    const isProduction = process.env.NODE_ENV === 'production';
    if (isProduction) {
        const corsOrigin = process.env.CORS_ORIGIN?.split(',').map((origin) => origin.trim()) || [];
        return {
            origin: corsOrigin,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            credentials: true,
        };
    }
    return {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    };
};
exports.getCorsConfig = getCorsConfig;
//# sourceMappingURL=getCorsConfig.js.map
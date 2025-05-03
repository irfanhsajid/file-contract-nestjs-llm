"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    port: parseInt(process.env.PORT ?? '3000'),
    mongo: {
        host: process.env.CLINVERIFY_MONGO_SERVICE_HOST,
        port: process.env.CLINVERIFY_MONGO_SERVICE_PORT_HTTP,
        db: process.env.MONGODB_DB_NAME ?? 'natera-clinverify',
    },
    graphqlUploadExpress: {
        maxFileSize: 10000000,
        maxFiles: 1,
    },
    okta: {
        clientId: process.env.OKTA_CLIENT_ID ?? '',
        secret: process.env.OKTA_CLIENT_SECRET ?? '',
        issuer: process.env.OKTA_API_URL ?? '',
        scopes: (process.env.OKTA_SCOPES ?? '').split(','),
    },
};
//# sourceMappingURL=config.js.map
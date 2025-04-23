"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    port: parseInt(process.env.PORT || '3000'),
    mongo: {
        host: process.env.CLINVERIFY_MONGO_SERVICE_HOST,
        port: process.env.CLINVERIFY_MONGO_SERVICE_PORT_HTTP,
        db: process.env.MONGODB_DB_NAME || 'natera-clinverify',
    },
    graphqlUploadExpress: {
        maxFileSize: 10000000,
        maxFiles: 1,
    },
};
//# sourceMappingURL=config.js.map
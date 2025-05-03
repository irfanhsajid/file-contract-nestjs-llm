"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const core_1 = require("@nestjs/core");
const graphqlUploadExpress_mjs_1 = __importDefault(require("graphql-upload/graphqlUploadExpress.mjs"));
const common_1 = require("@nestjs/common");
const app_module_1 = require("./modules/app/app.module");
const config_1 = __importDefault(require("./config"));
const logging_interceptor_1 = require("./interceptors/logging.interceptor");
const getCorsConfig_1 = require("./utils/getCorsConfig");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = new common_1.Logger('Main');
    app.enableCors((0, getCorsConfig_1.getCorsConfig)());
    app.useGlobalInterceptors(new logging_interceptor_1.GraphQLLoggingInterceptor());
    app.use((0, graphqlUploadExpress_mjs_1.default)({
        maxFileSize: config_1.default.graphqlUploadExpress.maxFileSize,
        maxFiles: config_1.default.graphqlUploadExpress.maxFiles,
    }));
    const PORT = config_1.default.port;
    await app.listen(PORT, () => {
        logger.log(`Server is running on http://localhost:${PORT}`);
        logger.log(`GraphQL Playground is available at http://localhost:${PORT}/graphql`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map
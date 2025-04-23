"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseFactory = void 0;
const config_1 = __importDefault(require("../config"));
const mongooseFactory = () => {
    const mongoConfig = config_1.default.mongo;
    if (!mongoConfig.host || !mongoConfig.port) {
        throw new Error('Database URI is not defined in the configuration.');
    }
    return {
        uri: `mongodb://${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.db}`,
    };
};
exports.mongooseFactory = mongooseFactory;
//# sourceMappingURL=mongooseFactory.js.map
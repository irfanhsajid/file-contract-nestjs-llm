"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileContractResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const GraphQLUpload_mjs_1 = __importDefault(require("graphql-upload/GraphQLUpload.mjs"));
const zod_1 = require("zod");
const file_contract_service_1 = require("./file-contract.service");
const file_contract_schema_1 = require("./file-contract.schema");
const graphql_schema_1 = require("../../graphql.schema");
let FileContractResolver = class FileContractResolver {
    constructor(fileContractService) {
        this.fileContractService = fileContractService;
    }
    async getFileContracts(input) {
        return this.fileContractService.getFileContracts(input);
    }
    async processCleanIQResult(data) {
        return this.fileContractService.processCleanIQResult(data);
    }
    async createExtractionResult(input) {
        return this.fileContractService.createExtractionResult(input);
    }
    async updateExtractionResult(extractionId, input) {
        return this.fileContractService.updateExtractionResult(extractionId, input);
    }
    async deleteExtractionResult(extractionId) {
        return this.fileContractService.deleteExtractionResult(extractionId);
    }
};
exports.FileContractResolver = FileContractResolver;
__decorate([
    (0, graphql_1.Query)(() => graphql_schema_1.PaginatedFileContracts, { name: 'getFileContracts' }),
    __param(0, (0, graphql_1.Args)({ name: 'input', type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graphql_schema_1.InputListFileContracts]),
    __metadata("design:returntype", Promise)
], FileContractResolver.prototype, "getFileContracts", null);
__decorate([
    (0, graphql_1.Mutation)(() => file_contract_schema_1.FileContract, { name: 'processCleanIQResult' }),
    __param(0, (0, graphql_1.Args)({ name: 'file', type: () => GraphQLUpload_mjs_1.default })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [void 0]),
    __metadata("design:returntype", Promise)
], FileContractResolver.prototype, "processCleanIQResult", null);
__decorate([
    (0, graphql_1.Mutation)(() => file_contract_schema_1.ExtractionResult),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graphql_schema_1.CreateExtractionResultInput]),
    __metadata("design:returntype", Promise)
], FileContractResolver.prototype, "createExtractionResult", null);
__decorate([
    (0, graphql_1.Mutation)(() => file_contract_schema_1.ExtractionResult),
    __param(0, (0, graphql_1.Args)('extractionId')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, graphql_schema_1.UpdateExtractionResultInput]),
    __metadata("design:returntype", Promise)
], FileContractResolver.prototype, "updateExtractionResult", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('extractionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FileContractResolver.prototype, "deleteExtractionResult", null);
exports.FileContractResolver = FileContractResolver = __decorate([
    (0, graphql_1.Resolver)('FileContract'),
    __metadata("design:paramtypes", [file_contract_service_1.FileContractService])
], FileContractResolver);
//# sourceMappingURL=file-contract.resolver.js.map
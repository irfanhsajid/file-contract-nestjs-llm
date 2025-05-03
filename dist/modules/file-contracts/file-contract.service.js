"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var FileContractService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileContractService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importStar(require("mongoose"));
const toCamelCaseKeys_1 = require("../../utils/toCamelCaseKeys");
const file_contract_validator_1 = require("./file-contract.validator");
const file_contract_schema_1 = require("./file-contract.schema");
let FileContractService = FileContractService_1 = class FileContractService {
    constructor(fileContractModel, extractionResultModel) {
        this.fileContractModel = fileContractModel;
        this.extractionResultModel = extractionResultModel;
        this.logger = new common_1.Logger(FileContractService_1.name);
        this.DEFAULT_PAGE = 1;
        this.DEFAULT_PER_PAGE = 16;
    }
    getFilteredFileContracts(input) {
        const { casebundlingIds, patientIds, eventTypes, validationStatuses, cancerTypes, projectNames, page, perPage, } = input;
        const _page = page || this.DEFAULT_PAGE;
        const _perPage = perPage || this.DEFAULT_PER_PAGE;
        const rootMatches = {
            ...(casebundlingIds &&
                casebundlingIds.length > 0 && {
                'metadata.casebundlingId': { $in: casebundlingIds },
            }),
            ...(cancerTypes &&
                cancerTypes.length > 0 && {
                'metadata.cancerType': { $in: cancerTypes },
            }),
            ...(projectNames &&
                projectNames.length > 0 && {
                'metadata.projectName': { $in: projectNames },
            }),
            ...(patientIds &&
                patientIds.length > 0 && {
                'metadata.patientId': { $in: patientIds },
            }),
            ...(validationStatuses &&
                validationStatuses.length > 0 && {
                'metadata.validationStatus': { $in: validationStatuses },
            }),
        };
        const extractionResultsMatches = {
            ...(eventTypes &&
                eventTypes.length > 0 && {
                'extractionResults.eventType': { $in: eventTypes },
            }),
        };
        const basedPipeline = [
            { $match: rootMatches },
            {
                $lookup: {
                    from: file_contract_schema_1.ExtractionResultCollectionName,
                    localField: 'extractionResults',
                    foreignField: '_id',
                    as: 'extractionResults',
                },
            },
            { $unwind: '$extractionResults' },
            {
                $match: extractionResultsMatches,
            },
        ];
        const itemsPipeline = [
            ...basedPipeline,
            {
                $group: {
                    _id: '$_id',
                    schemaVersion: { $first: '$schemaVersion' },
                    metadata: { $first: '$metadata' },
                    extractionResults: { $push: '$extractionResults' },
                    createdAt: { $first: '$createdAt' },
                },
            },
            { $skip: (_page - 1) * _perPage },
            { $limit: _perPage },
        ];
        const totalCountPipeline = [
            ...basedPipeline,
            {
                $group: {
                    _id: '$_id',
                },
            },
            { $count: 'total' },
        ];
        return { itemsPipeline, totalCountPipeline };
    }
    async getFileContracts(input) {
        const { itemsPipeline, totalCountPipeline } = this.getFilteredFileContracts(input);
        this.logger.log(`Fetching file contract with filters: ${JSON.stringify({ itemsPipeline, totalCountPipeline })}`);
        const [items, countResult] = await Promise.all([
            this.fileContractModel.aggregate(itemsPipeline).exec(),
            this.fileContractModel.aggregate(totalCountPipeline).exec(),
        ]);
        const total = countResult.length > 0 ? countResult[0].total : 0;
        return {
            items,
            total,
            page: input.page || this.DEFAULT_PAGE,
            perPage: input.perPage || this.DEFAULT_PER_PAGE,
        };
    }
    parseJsonFile(data) {
        try {
            return (0, toCamelCaseKeys_1.toCamelCaseKeys)(JSON.parse(data));
        }
        catch (error) {
            this.logger.error('Error parsing JSON file', error);
            throw new common_1.BadRequestException('Invalid JSON format');
        }
    }
    createExtractionResultSources(casebundlingId) {
        return ({ source, ...result }) => {
            const extractionResult = new this.extractionResultModel({
                ...result,
                ...(source &&
                    Array.isArray(source) &&
                    source.length > 0 && {
                    source: source.map((src) => {
                        if (typeof src === 'string') {
                            return { sourceString: src };
                        }
                        return src;
                    }),
                }),
                _id: new mongoose_2.default.Types.ObjectId(),
                casebundlingId,
            });
            return extractionResult.save();
        };
    }
    async processCleanIQResult({ file }) {
        const { createReadStream } = file;
        return new Promise((resolve, reject) => {
            const chunks = [];
            return createReadStream()
                .on('data', (chunk) => {
                chunks.push(chunk);
            })
                .on('end', async () => {
                const _data = Buffer.concat(chunks).toString('utf-8');
                const camelCaseInput = this.parseJsonFile(_data);
                this.logger.log(`Parsed and converted input to camelCase: ${JSON.stringify(camelCaseInput)}`);
                const parsed = file_contract_validator_1.zFileContractSchema.safeParse(camelCaseInput);
                if (!parsed.success) {
                    this.logger.error('Validation failed', parsed.error.format());
                    reject(new common_1.BadRequestException('Invalid file format'));
                    return;
                }
                const extractionResults = await Promise.all(parsed.data.extractionResults.map(this.createExtractionResultSources(parsed.data.metadata.casebundlingId)));
                const fileContractData = {
                    _id: new mongoose_2.default.Types.ObjectId(),
                    schemaVersion: parsed.data.schemaVersion,
                    metadata: {
                        ...parsed.data.metadata,
                        caseId: parsed.data.metadata.caseId ?? undefined,
                        casebundlingType: parsed.data.metadata.casebundlingType ?? undefined,
                    },
                    extractionResults: extractionResults.map((result) => result._id),
                    createdAt: new Date(),
                };
                const createdFileContract = new this.fileContractModel(fileContractData);
                await createdFileContract.save();
                this.logger.log(`File contract created with ID: ${createdFileContract._id.toString()}`);
                const _result = await createdFileContract.populate('extractionResults');
                resolve(_result);
            })
                .on('error', (error) => {
                this.logger.error('Error reading file', error);
                reject(error);
            });
        });
    }
    async createExtractionResult(input) {
        const { casebundlingId, patientId } = input;
        const fileContract = await this.fileContractModel.findOne({
            'metadata.casebundlingId': casebundlingId,
            'metadata.patientId': patientId,
        });
        if (!fileContract) {
            throw new common_1.NotFoundException(`No FileContract found for casebundlingId: ${casebundlingId} and patientId: ${patientId}`);
        }
        const extractionResult = new this.extractionResultModel({
            ...input,
            _id: new mongoose_2.default.Types.ObjectId(),
        });
        const savedResult = await extractionResult.save();
        fileContract.extractionResults.push(savedResult._id);
        await fileContract.save();
        this.logger.log(`Added ExtractionResult ${savedResult._id.toString()} to FileContract ${fileContract._id.toString()}`);
        return savedResult;
    }
    async updateExtractionResult(extractionId, input) {
        this.logger.log(`Fetching extraction with _id: ${extractionId} and input: ${JSON.stringify(input)}`);
        const _extractionId = new mongoose_2.default.Types.ObjectId(extractionId);
        const updatedResult = await this.extractionResultModel
            .findByIdAndUpdate(_extractionId, { $set: input }, { new: true })
            .exec();
        if (!updatedResult) {
            throw new common_1.NotFoundException(`ExtractionResult with _id: ${extractionId} not found`);
        }
        return updatedResult;
    }
    async deleteExtractionResult(extractionId) {
        const _extractionId = new mongoose_2.default.Types.ObjectId(extractionId);
        const result = await this.extractionResultModel.findByIdAndDelete(_extractionId).exec();
        if (!result) {
            throw new common_1.NotFoundException(`ExtractionResult with _id: ${extractionId} not found`);
        }
        await this.fileContractModel.updateMany({ extractionResults: _extractionId }, { $pull: { extractionResults: _extractionId } });
        return true;
    }
};
exports.FileContractService = FileContractService;
exports.FileContractService = FileContractService = FileContractService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(file_contract_schema_1.FileContract.name)),
    __param(1, (0, mongoose_1.InjectModel)(file_contract_schema_1.ExtractionResult.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], FileContractService);
//# sourceMappingURL=file-contract.service.js.map
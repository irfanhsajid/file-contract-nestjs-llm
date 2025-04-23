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
var FileContractService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileContractService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const lodash_1 = __importDefault(require("lodash"));
const mongoose_2 = require("mongoose");
const snakeToCamelCaseKeys_1 = require("../../utils/snakeToCamelCaseKeys");
const file_contract_schema_1 = require("./file-contract.schema");
let FileContractService = FileContractService_1 = class FileContractService {
    constructor(fileContractModel) {
        this.fileContractModel = fileContractModel;
        this.logger = new common_1.Logger(FileContractService_1.name);
    }
    async getFileContract(id) {
        this.logger.log(`Fetching file contract with ID: ${id}`);
        const fileContract = await this.fileContractModel.findById(id).lean();
        if (!fileContract) {
            this.logger.error(`No file contract found for ID: ${id}`);
            throw new common_1.NotFoundException('File contract not found');
        }
        const camelCasedContractData = (0, snakeToCamelCaseKeys_1.snakeToCamelCaseKeys)(fileContract);
        return camelCasedContractData;
    }
    async getExtraction(extractionId) {
        const query = { 'metadata.extraction_id': extractionId };
        const fileContract = await this.fileContractModel.findOne(query).lean();
        if (!fileContract) {
            this.logger.error(`No file contract found for ID: ${extractionId}`);
            throw new common_1.NotFoundException('File contract not found');
        }
        const camelCasedContractData = (0, snakeToCamelCaseKeys_1.snakeToCamelCaseKeys)(fileContract);
        return camelCasedContractData;
    }
    async getSingleEvent({ eventId, filename, }) {
        if (!filename && !eventId) {
            this.logger.error('At least one of filename, or eventId must be provided');
            throw new common_1.NotFoundException('At least one of extractionId, filename, or eventId must be provided');
        }
        const query = {};
        if (filename) {
            this.logger.log(`Fetching extraction with filename: ${filename}`);
            query['extraction_results.Source.filename'] = filename;
        }
        if (eventId) {
            this.logger.log(`Fetching extraction with eventId: ${eventId}`);
            query['extraction_results.event_id'] = eventId;
        }
        const fileContract = await this.fileContractModel.findOne(query).lean();
        if (!fileContract) {
            this.logger.error(`No file contract found for query: ${JSON.stringify(query)}`);
            throw new common_1.NotFoundException('File contract not found');
        }
        const matchingExtraction = lodash_1.default.chain([fileContract])
            .flatMap((fc) => fc.extraction_results || [])
            .filter({
            ...(eventId && { event_id: eventId }),
            ...(filename && { Source: { filename } }),
        })
            .first()
            .value();
        if (!matchingExtraction) {
            this.logger.error(`No extraction result found for query: ${JSON.stringify(query)}`);
            throw new common_1.NotFoundException('Extraction result not found');
        }
        const camelCasedExtraction = (0, snakeToCamelCaseKeys_1.snakeToCamelCaseKeys)(matchingExtraction);
        return camelCasedExtraction;
    }
    async deleteEventByEventId(eventId) {
        if (!eventId) {
            this.logger.error('eventId must be provided');
            throw new common_1.NotFoundException('eventId must be provided');
        }
        const updatedDoc = await this.fileContractModel.findOneAndUpdate({ 'extraction_results.event_id': eventId }, { $pull: { extraction_results: { event_id: eventId } } }, { new: true });
        console.log('updated doc', updatedDoc);
        await updatedDoc?.save();
        this.logger.log(`Successfully deleted eventId ${eventId} from extraction_results`);
        return {
            message: `Event with eventId ${eventId} deleted successfully`,
            status: true,
        };
    }
    async createEvent(event) {
        const { patientId, eventId, category, eventType, eventDetail, llmExtraction, reasoning, model, parserName, codeLabel, codeValue, source, } = event;
        const query = { 'metadata.patient_id': patientId };
        const originalDocument = await this.fileContractModel.findOne(query).lean();
        if (!originalDocument) {
            this.logger.error(`No FileContract found for patientId: ${patientId}`);
            throw new common_1.NotFoundException(`No FileContract found for patientId: ${patientId}`);
        }
        this.logger.log(`Original document: ${JSON.stringify(originalDocument, null, 2)}`);
        const existingEvent = originalDocument.extraction_results.find((result) => result.event_id === eventId);
        const newEvent = {
            category,
            event_type: eventType,
            event_detail: eventDetail,
            llm_extraction: llmExtraction,
            reasoning,
            patient_id: patientId,
            event_id: eventId,
            model: model || null,
            parser_name: parserName || null,
            code_label: codeLabel || null,
            code_value: codeValue || null,
            Source: source || null,
        };
        const update = {
            $push: { extraction_results: newEvent },
            $inc: { 'metadata.total_extractions': 1 },
        };
        this.logger.log(`Executing query: ${JSON.stringify(query)}`);
        this.logger.log(`Executing update: ${JSON.stringify(update)}`);
        const updateResult = await this.fileContractModel.updateOne(query, update, {
            writeConcern: { w: 'majority', j: true },
        });
        this.logger.log(`Update result: ${JSON.stringify(updateResult, null, 2)}`);
        if (updateResult.matchedCount === 0) {
            this.logger.error(`Failed to match FileContract for patientId: ${patientId}`);
            throw new common_1.NotFoundException(`Failed to match FileContract for patientId: ${patientId}`);
        }
        if (updateResult.modifiedCount === 0) {
            this.logger.error(`Failed to update FileContract for patientId: ${patientId}`);
        }
        const updatedDocument = await this.fileContractModel.findOne(query).lean();
        if (!updatedDocument) {
            this.logger.error(`Failed to fetch updated FileContract for patientId: ${patientId}`);
            throw new common_1.NotFoundException(`Failed to fetch updated FileContract for patientId: ${patientId}`);
        }
        this.logger.log(`Updated document: ${JSON.stringify(updatedDocument, null, 2)}`);
        const addedEvent = updatedDocument.extraction_results.find((result) => result.event_id === eventId);
        if (!addedEvent) {
            this.logger.error(`Event with eventId: ${eventId} was not added to extraction_results`);
        }
        return {
            message: `Event with eventId ${eventId} created successfully`,
            status: true,
        };
    }
};
exports.FileContractService = FileContractService;
exports.FileContractService = FileContractService = FileContractService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(file_contract_schema_1.FileContractToken)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FileContractService);
//# sourceMappingURL=file-contract.service.js.map
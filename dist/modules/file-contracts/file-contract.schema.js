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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileContractSchema = exports.MetaDataSchema = exports.ExtractionResultSchema = exports.SourceSchema = exports.FileContract = exports.FileContractCollectionName = exports.MetaData = exports.ExtractionResult = exports.ExtractionResultCollectionName = exports.Source = exports.ECategory = exports.EEventType = exports.EValidationStatus = exports.EProductType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
var EProductType;
(function (EProductType) {
    EProductType["EPIC"] = "epic";
    EProductType["SIGNATERA"] = "signatera";
})(EProductType || (exports.EProductType = EProductType = {}));
var EValidationStatus;
(function (EValidationStatus) {
    EValidationStatus["COMPLETED"] = "completed";
    EValidationStatus["PENDING"] = "pending";
})(EValidationStatus || (exports.EValidationStatus = EValidationStatus = {}));
var EEventType;
(function (EEventType) {
    EEventType["DemoGraphicData"] = "Demographic Data";
    EEventType["CancerDiagnosis"] = "Cancer Diagnosis";
    EEventType["TumorMetastasis"] = "Tumor Metastasis";
    EEventType["GroupStage"] = "Group Stage";
    EEventType["TNMStage"] = "TNM Stage";
    EEventType["Surgery"] = "Surgery";
    EEventType["CancerMedication"] = "Cancer Medication";
    EEventType["Radiation"] = "Radiation";
    EEventType["OtherProcedure"] = "Other Procedure";
    EEventType["TumorResponseToTherapy"] = "Tumor Response to Therapy";
    EEventType["CancerOutcome"] = "Cancer Outcome";
    EEventType["Death"] = "Death";
    EEventType["Biomarker"] = "Biomarker";
    EEventType["ClinicalFollowUp"] = "Clinical Follow-Up";
})(EEventType || (exports.EEventType = EEventType = {}));
var ECategory;
(function (ECategory) {
    ECategory["Biomarker"] = "Biomarker";
    ECategory["Condition"] = "Condition";
    ECategory["Outcome"] = "Outcome";
    ECategory["TherapeuticProcedure"] = "Therapeutic Procedure";
})(ECategory || (exports.ECategory = ECategory = {}));
let Source = class Source {
};
exports.Source = Source;
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Number)
], Source.prototype, "similarityScore", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Source.prototype, "chunkId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Number)
], Source.prototype, "chunkNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Source.prototype, "text", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Source.prototype, "textS3Link", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Number)
], Source.prototype, "pageNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Number)
], Source.prototype, "documentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Source.prototype, "documentCategory", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Number)
], Source.prototype, "totalPage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Source.prototype, "filename", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Source.prototype, "testType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: EProductType, required: false }),
    __metadata("design:type", String)
], Source.prototype, "productType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], required: false }),
    __metadata("design:type", Array)
], Source.prototype, "coordinates", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Source.prototype, "value", void 0);
exports.Source = Source = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Source);
exports.ExtractionResultCollectionName = 'extraction_results';
let ExtractionResult = class ExtractionResult {
};
exports.ExtractionResult = ExtractionResult;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.default.Types.ObjectId)
], ExtractionResult.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ECategory }),
    __metadata("design:type", String)
], ExtractionResult.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: EEventType }),
    __metadata("design:type", String)
], ExtractionResult.prototype, "eventType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ExtractionResult.prototype, "eventDetail", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], ExtractionResult.prototype, "llmExtraction", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], ExtractionResult.prototype, "reasoning", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], ExtractionResult.prototype, "patientId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], ExtractionResult.prototype, "casebundlingId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], ExtractionResult.prototype, "eventId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], ExtractionResult.prototype, "model", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], ExtractionResult.prototype, "parserName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], ExtractionResult.prototype, "codeLabel", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], ExtractionResult.prototype, "codeValue", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Source], required: false }),
    __metadata("design:type", Array)
], ExtractionResult.prototype, "source", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Date)
], ExtractionResult.prototype, "createdAt", void 0);
exports.ExtractionResult = ExtractionResult = __decorate([
    (0, mongoose_1.Schema)({ collection: exports.ExtractionResultCollectionName, timestamps: true })
], ExtractionResult);
let MetaData = class MetaData {
};
exports.MetaData = MetaData;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], MetaData.prototype, "projectName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], MetaData.prototype, "cancerType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], MetaData.prototype, "patientId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Number)
], MetaData.prototype, "caseId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], MetaData.prototype, "casebundlingId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], MetaData.prototype, "casebundlingType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], MetaData.prototype, "extractionId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], MetaData.prototype, "genaiPipelineVersion", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], MetaData.prototype, "totalExtractions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: EValidationStatus, required: true }),
    __metadata("design:type", String)
], MetaData.prototype, "validationStatus", void 0);
exports.MetaData = MetaData = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], MetaData);
exports.FileContractCollectionName = 'file_contracts';
let FileContract = class FileContract {
};
exports.FileContract = FileContract;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.default.Types.ObjectId)
], FileContract.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FileContract.prototype, "schemaVersion", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: MetaData, required: true, index: true }),
    __metadata("design:type", MetaData)
], FileContract.prototype, "metadata", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'ExtractionResult' }],
        required: true,
        index: true,
    }),
    __metadata("design:type", Array)
], FileContract.prototype, "extractionResults", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Date)
], FileContract.prototype, "createdAt", void 0);
exports.FileContract = FileContract = __decorate([
    (0, mongoose_1.Schema)({ collection: exports.FileContractCollectionName, timestamps: true })
], FileContract);
exports.SourceSchema = mongoose_1.SchemaFactory.createForClass(Source);
exports.ExtractionResultSchema = mongoose_1.SchemaFactory.createForClass(ExtractionResult);
exports.MetaDataSchema = mongoose_1.SchemaFactory.createForClass(MetaData);
exports.FileContractSchema = mongoose_1.SchemaFactory.createForClass(FileContract);
exports.ExtractionResultSchema.index({ casebundlingId: 1 });
exports.ExtractionResultSchema.index({ eventType: 1 });
exports.ExtractionResultSchema.index({ patientId: 1 });
exports.ExtractionResultSchema.index({ category: 1 });
exports.ExtractionResultSchema.index({ casebundlingId: 1, eventType: 1 });
exports.FileContractSchema.index({ 'metadata.casebundlingId': 1 });
exports.FileContractSchema.index({ 'metadata.patientId': 1 });
exports.FileContractSchema.index({ 'metadata.cancerType': 1 });
exports.FileContractSchema.index({ 'metadata.projectName': 1 });
exports.FileContractSchema.index({ 'metadata.validationStatus': 1 });
exports.FileContractSchema.index({
    'metadata.casebundlingId': 1,
    'metadata.patientId': 1,
});
//# sourceMappingURL=file-contract.schema.js.map
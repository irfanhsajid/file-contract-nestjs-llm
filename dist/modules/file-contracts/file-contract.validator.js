"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zUploadFileSchema = exports.zFileContractSchema = exports.zMetaDataSchema = exports.zExtractionResultSchema = exports.zSourceUnionSchema = exports.zSourceSchema = exports.zStatusSchema = exports.zProductTypeSchema = void 0;
const zod_1 = require("zod");
exports.zProductTypeSchema = zod_1.z.enum(['epic', 'signatera']);
exports.zStatusSchema = zod_1.z.enum(['completed', 'pending']);
exports.zSourceSchema = zod_1.z.object({
    similarityScore: zod_1.z.number(),
    chunkId: zod_1.z.string(),
    chunkNumber: zod_1.z.number(),
    text: zod_1.z.string(),
    textS3Link: zod_1.z.string(),
    pageNumber: zod_1.z.number(),
    documentId: zod_1.z.number(),
    documentCategory: zod_1.z.string(),
    totalPage: zod_1.z.number(),
    filename: zod_1.z.string(),
    testType: zod_1.z.string().nullable().optional(),
    productType: exports.zProductTypeSchema,
    coordinates: zod_1.z.array(zod_1.z.number().optional()).nullable().optional(),
});
exports.zSourceUnionSchema = zod_1.z.union([
    exports.zSourceSchema.nullable().optional(),
    zod_1.z.string().nullable().optional(),
]);
exports.zExtractionResultSchema = zod_1.z.object({
    _id: zod_1.z.string().optional(),
    category: zod_1.z.string(),
    eventType: zod_1.z.string(),
    eventDetail: zod_1.z.string(),
    llmExtraction: zod_1.z.string().nullable().optional(),
    reasoning: zod_1.z.string().nullable().optional(),
    patientId: zod_1.z.number(),
    eventId: zod_1.z.string(),
    model: zod_1.z.string(),
    parserName: zod_1.z.string().nullable().optional(),
    codeLabel: zod_1.z.string().nullable().optional(),
    codeValue: zod_1.z.string().nullable().optional(),
    source: zod_1.z.array(exports.zSourceUnionSchema).nullable().optional(),
});
exports.zMetaDataSchema = zod_1.z.object({
    projectName: zod_1.z.string(),
    cancerType: zod_1.z.string(),
    patientId: zod_1.z.number(),
    caseId: zod_1.z.number().nullable().optional(),
    casebundlingId: zod_1.z.number(),
    casebundlingType: zod_1.z.string().nullable().optional(),
    extractionId: zod_1.z.string(),
    genaiPipelineVersion: zod_1.z.string(),
    totalExtractions: zod_1.z.number(),
    validationStatus: exports.zStatusSchema,
});
exports.zFileContractSchema = zod_1.z.object({
    schemaVersion: zod_1.z.string(),
    metadata: exports.zMetaDataSchema,
    extractionResults: zod_1.z.array(exports.zExtractionResultSchema),
});
exports.zUploadFileSchema = zod_1.z.object({
    file: zod_1.z
        .object({
        filename: zod_1.z.string(),
        mimetype: zod_1.z.string(),
        encoding: zod_1.z.string(),
        createReadStream: zod_1.z.function().returns(zod_1.z.any()),
    })
        .required(),
});
//# sourceMappingURL=file-contract.validator.js.map
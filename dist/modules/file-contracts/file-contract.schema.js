"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileContractToken = exports.FileContractSchema = exports.zFileContractSchema = exports.MetaDataSchema = exports.ExtractionResultSchema = exports.SourceSchema = exports.CoordinatesSchema = exports.BoundingBoxInputSchema = void 0;
const zod_mongoose_1 = require("@zodyac/zod-mongoose");
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
(0, zod_mongoose_1.extendZod)(zod_1.z);
exports.BoundingBoxInputSchema = zod_1.z.object({
    top: zod_1.z.number(),
    left: zod_1.z.number(),
    width: zod_1.z.number(),
    height: zod_1.z.number(),
});
exports.CoordinatesSchema = zod_1.z.object({
    page: zod_1.z.number(),
    boundingBox: exports.BoundingBoxInputSchema,
});
exports.SourceSchema = zod_1.z.object({
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
    testType: zod_1.z.string(),
    productType: zod_1.z.string(),
    coordinates: exports.CoordinatesSchema,
});
exports.ExtractionResultSchema = zod_1.z.object({
    _id: zod_1.z.string().optional(),
    category: zod_1.z.string(),
    eventType: zod_1.z.string(),
    eventDetail: zod_1.z.string(),
    llmExtraction: zod_1.z.string().optional(),
    reasoning: zod_1.z.string().optional(),
    patientId: zod_1.z.number(),
    eventId: zod_1.z.string().optional(),
    parserName: zod_1.z.string().optional(),
    codeLabel: zod_1.z.string().optional(),
    codeValue: zod_1.z.string().optional(),
    source: exports.SourceSchema,
});
exports.MetaDataSchema = zod_1.z
    .object({
    patientId: zod_1.z.number(),
    caseId: zod_1.z.number().nullable().optional(),
    casebundlingId: zod_1.z.number().nullable().optional(),
    casebundlingType: zod_1.z.string().nullable().optional(),
    extractionId: zod_1.z.string(),
    genaiPipelineVersion: zod_1.z.string(),
    totalExtractions: zod_1.z.number(),
    extractionStatus: zod_1.z.enum(['pending', 'completed']),
    validationStatus: zod_1.z.enum(['pending', 'completed']),
})
    .optional();
exports.zFileContractSchema = zod_1.z.object({
    schemaVersion: zod_1.z.string(),
    metadata: exports.MetaDataSchema,
    extractionResults: zod_1.z.array(exports.ExtractionResultSchema),
    createdAt: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'createdAt must be a valid ISO date string',
    }),
    updatedAt: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'updatedAt must be a valid ISO date string',
    }),
});
exports.FileContractSchema = new mongoose_1.Schema((0, zod_mongoose_1.zodSchemaRaw)(exports.zFileContractSchema), {
    collection: 'file_contracts',
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.FileContractToken = 'FileContract';
//# sourceMappingURL=file-contract.schema.js.map
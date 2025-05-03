import { z } from 'zod';

// Enum Schemas
export const zProductTypeSchema = z.enum(['epic', 'signatera']);
export const zStatusSchema = z.enum(['completed', 'pending']);

// Source Schema
export const zSourceSchema = z.object({
  similarityScore: z.number(),
  chunkId: z.string(),
  chunkNumber: z.number(),
  text: z.string(),
  textS3Link: z.string(),
  pageNumber: z.number(),
  documentId: z.number(),
  documentCategory: z.string(),
  totalPage: z.number(),
  filename: z.string(),
  testType: z.string().nullable().optional(),
  productType: zProductTypeSchema, // Updated to use ProductType enum
  coordinates: z.array(z.number().optional()).nullable().optional(),
});

// SourceUnion Schema (supports Source or SourceString)
export const zSourceUnionSchema = z.union([
  zSourceSchema.nullable().optional(),
  z.string().nullable().optional(),
]);

// ExtractionResult Schema
export const zExtractionResultSchema = z.object({
  _id: z.string().optional(),
  category: z.string(),
  eventType: z.string(),
  eventDetail: z.string(),
  llmExtraction: z.string().nullable().optional(),
  reasoning: z.string().nullable().optional(),
  patientId: z.number(),
  eventId: z.string(),
  model: z.string(),
  parserName: z.string().nullable().optional(),
  codeLabel: z.string().nullable().optional(),
  codeValue: z.string().nullable().optional(),
  source: z.array(zSourceUnionSchema).nullable().optional(), // Updated to use SourceUnion
});

// MetaData Schema
export const zMetaDataSchema = z.object({
  projectName: z.string(),
  cancerType: z.string(),
  patientId: z.number(),
  caseId: z.number().nullable().optional(),
  casebundlingId: z.number(),
  casebundlingType: z.string().nullable().optional(),
  extractionId: z.string(),
  genaiPipelineVersion: z.string(),
  totalExtractions: z.number(),
  validationStatus: zStatusSchema, // Updated to use Status enum
});

// LLM-OutputContract Schema
export const zFileContractSchema = z.object({
  schemaVersion: z.string(),
  metadata: zMetaDataSchema,
  extractionResults: z.array(zExtractionResultSchema),
});

export const zUploadFileSchema = z.object({
  file: z
    .object({
      filename: z.string(),
      mimetype: z.string(),
      encoding: z.string(),
      createReadStream: z.function().returns(z.any()),
    })
    .required(),
});

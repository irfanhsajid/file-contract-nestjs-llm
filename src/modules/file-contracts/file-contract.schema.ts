import { extendZod, zodSchemaRaw } from '@zodyac/zod-mongoose';
import { Schema } from 'mongoose';
import { z } from 'zod';

extendZod(z);

// Enum Schemas
export const ProductTypeSchema = z.enum(['EPIC', 'SIGNATERA']);
export const StatusSchema = z.enum(['COMPLETED', 'PENDING']);

// Source Schema
export const SourceSchema = z.object({
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
  testType: z.string(),
  productType: ProductTypeSchema, // Updated to use ProductType enum
  coordinates: z.array(z.string()),
});

// SourceString Schema (for string case)
export const SourceStringSchema = z.object({
  value: z.string(),
});

// SourceUnion Schema (supports Source or SourceString)
export const SourceUnionSchema = z.union([SourceSchema, SourceStringSchema]);

// ExtractionResult Schema
export const ExtractionResultSchema = z.object({
  _id: z.string().optional(),
  category: z.string(),
  eventType: z.string(),
  eventDetail: z.string(),
  llmExtraction: z.string().optional(),
  reasoning: z.string().optional(),
  patientId: z.number(),
  eventId: z.string().optional(),
  parserName: z.string().optional(),
  codeLabel: z.string().optional(),
  codeValue: z.string().optional(),
  source: SourceUnionSchema, // Updated to use SourceUnion
});

// MetaData Schema
export const MetaDataSchema = z
  .object({
    patientId: z.number(),
    caseId: z.number().nullable().optional(),
    casebundlingId: z.number().nullable().optional(),
    casebundlingType: z.string().nullable().optional(),
    extractionId: z.string(),
    genaiPipelineVersion: z.string(),
    totalExtractions: z.number(),
    extractionStatus: StatusSchema, // Updated to use Status enum
    validationStatus: StatusSchema, // Updated to use Status enum
  })
  .optional();

// LLM-OutputContract Schema
export const zFileContractSchema = z.object({
  // _id is omitted to use MongoDB's default ObjectId type, transformed to string for GraphQL
  schemaVersion: z.string(),
  metadata: MetaDataSchema,
  extractionResults: z.array(ExtractionResultSchema),
  createdAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'createdAt must be a valid ISO date string',
  }),
  updatedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'updatedAt must be a valid ISO date string',
  }),
});

export const FileContractSchema: Schema = new Schema(zodSchemaRaw(zFileContractSchema), {
  collection: 'file_contracts',
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
});

export const FileContractToken = 'FileContract';

export type TFileContract = z.infer<typeof zFileContractSchema>;

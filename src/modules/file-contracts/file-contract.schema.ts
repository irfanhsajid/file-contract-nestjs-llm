import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

// Enums
export enum EProductType {
  EPIC = 'epic',
  SIGNATERA = 'signatera',
}

export enum EValidationStatus {
  COMPLETED = 'completed',
  PENDING = 'pending',
}

export enum EEventType {
  DemoGraphicData = 'Demographic Data',
  CancerDiagnosis = 'Cancer Diagnosis',
  TumorMetastasis = 'Tumor Metastasis',
  GroupStage = 'Group Stage',
  TNMStage = 'TNM Stage',
  Surgery = 'Surgery',
  CancerMedication = 'Cancer Medication',
  Radiation = 'Radiation',
  OtherProcedure = 'Other Procedure',
  TumorResponseToTherapy = 'Tumor Response to Therapy',
  CancerOutcome = 'Cancer Outcome',
  Death = 'Death',
  Biomarker = 'Biomarker',
  ClinicalFollowUp = 'Clinical Follow-Up',
}

export enum ECategory {
  Biomarker = 'Biomarker',
  Condition = 'Condition',
  Outcome = 'Outcome',
  TherapeuticProcedure = 'Therapeutic Procedure',
}

// Source Schema
@Schema({ _id: false })
export class Source {
  @Prop({ required: false })
  similarityScore?: number;

  @Prop({ required: false })
  chunkId?: string;

  @Prop({ required: false })
  chunkNumber?: number;

  @Prop({ required: false })
  text?: string;

  @Prop({ required: false })
  textS3Link?: string;

  @Prop({ required: false })
  pageNumber?: number;

  @Prop({ required: false })
  documentId?: number;

  @Prop({ required: false })
  documentCategory?: string;

  @Prop({ required: false })
  totalPage?: number;

  @Prop({ required: false })
  filename?: string;

  @Prop({ required: false })
  testType?: string;

  @Prop({ enum: EProductType, required: false })
  productType?: string;

  @Prop({ type: [String], required: false })
  coordinates?: string[];

  @Prop({ required: false })
  value?: string;
}

// ExtractionResult Schema
export const ExtractionResultCollectionName = 'extraction_results';
@Schema({ collection: ExtractionResultCollectionName, timestamps: true })
export class ExtractionResult {
  @Prop({ required: true })
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true, enum: ECategory })
  category: string;

  @Prop({ required: true, enum: EEventType })
  eventType: string;

  @Prop({ required: true })
  eventDetail: string;

  @Prop({ required: false })
  llmExtraction?: string;

  @Prop({ required: false })
  reasoning?: string;

  @Prop({ required: true })
  patientId: number;

  @Prop({ required: true })
  casebundlingId: number;

  @Prop({ required: false })
  eventId?: string;

  @Prop({ required: false })
  model?: string;

  @Prop({ required: false })
  parserName?: string;

  @Prop({ required: false })
  codeLabel?: string;

  @Prop({ required: false })
  codeValue?: string;

  @Prop({ type: [Source], required: false })
  source?: Source[];

  @Prop({ required: false })
  createdAt: Date;
}

// Metadata Schema
@Schema({ _id: false })
export class MetaData {
  @Prop({ required: true })
  projectName: string;

  @Prop({ required: true })
  cancerType: string;

  @Prop({ required: true })
  patientId: number;

  @Prop({ required: false })
  caseId?: number;

  @Prop({ required: true })
  casebundlingId: number;

  @Prop({ required: false })
  casebundlingType?: string;

  @Prop({ required: true })
  extractionId: string;

  @Prop({ required: true })
  genaiPipelineVersion: string;

  @Prop({ required: true })
  totalExtractions: number;

  @Prop({ enum: EValidationStatus, required: true })
  validationStatus: string;
}

// FileContract Schema
export const FileContractCollectionName = 'file_contracts';
@Schema({ collection: FileContractCollectionName, timestamps: true })
export class FileContract {
  @Prop({ required: true })
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  schemaVersion: string;

  @Prop({ type: MetaData, required: true, index: true })
  metadata: MetaData;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ExtractionResult' }],
    required: true,
    index: true,
  })
  extractionResults: mongoose.Types.ObjectId[]; // Array of ExtractionResult IDs

  @Prop({ required: false })
  createdAt: Date;
}

// Schema Factories
export const SourceSchema = SchemaFactory.createForClass(Source);
export const ExtractionResultSchema = SchemaFactory.createForClass(ExtractionResult);
export const MetaDataSchema = SchemaFactory.createForClass(MetaData);
export const FileContractSchema = SchemaFactory.createForClass(FileContract);

// Indexing
ExtractionResultSchema.index({ casebundlingId: 1 });
ExtractionResultSchema.index({ eventType: 1 });
ExtractionResultSchema.index({ patientId: 1 });
ExtractionResultSchema.index({ category: 1 });
ExtractionResultSchema.index({ casebundlingId: 1, eventType: 1 });

FileContractSchema.index({ 'metadata.casebundlingId': 1 });
FileContractSchema.index({ 'metadata.patientId': 1 });
FileContractSchema.index({ 'metadata.cancerType': 1 });
FileContractSchema.index({ 'metadata.projectName': 1 });
FileContractSchema.index({ 'metadata.validationStatus': 1 });
FileContractSchema.index({
  'metadata.casebundlingId': 1,
  'metadata.patientId': 1,
});

// Export the Mongoose model
export type ExtractionResultDocument = ExtractionResult & Document;
export type FileContractDocument = FileContract & Document;

/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum ProductType {
  EPIC = 'EPIC',
  SIGNATERA = 'SIGNATERA',
}

export enum Status {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
}

export class SourceInput {
  similarityScore?: Nullable<number>;
  chunkId?: Nullable<string>;
  chunkNumber?: Nullable<number>;
  text?: Nullable<string>;
  textS3Link?: Nullable<string>;
  pageNumber?: Nullable<number>;
  documentId?: Nullable<number>;
  documentCategory?: Nullable<string>;
  totalPage?: Nullable<number>;
  filename?: Nullable<string>;
  testType?: Nullable<string>;
  productType?: Nullable<ProductType>;
  coordinates?: Nullable<Nullable<string>[]>;
  value?: Nullable<string>;
}

export class EventInput {
  patientId: number;
  eventId: string;
  category: string;
  eventType: string;
  eventDetail: string;
  llmExtraction: string;
  reasoning: string;
  parserName?: Nullable<string>;
  codeLabel?: Nullable<string>;
  codeValue?: Nullable<string>;
  source?: Nullable<SourceInput>;
}

export class Source {
  similarityScore?: Nullable<number>;
  chunkId?: Nullable<string>;
  chunkNumber?: Nullable<number>;
  text?: Nullable<string>;
  textS3Link?: Nullable<string>;
  pageNumber?: Nullable<number>;
  documentId?: Nullable<number>;
  documentCategory?: Nullable<string>;
  totalPage?: Nullable<number>;
  filename?: Nullable<string>;
  testType?: Nullable<string>;
  productType?: Nullable<ProductType>;
  coordinates?: Nullable<Nullable<string>[]>;
}

export class SourceString {
  value?: Nullable<string>;
}

export class ExtractionEvent {
  category?: Nullable<string>;
  eventType?: Nullable<string>;
  eventDetail?: Nullable<string>;
  llmExtraction?: Nullable<string>;
  reasoning?: Nullable<string>;
  patientId?: Nullable<number>;
  eventId?: Nullable<string>;
  model?: Nullable<string>;
  parserName?: Nullable<string>;
  codeLabel?: Nullable<string>;
  codeValue?: Nullable<string>;
  source?: Nullable<SourceUnion>;
}

export class MetaData {
  patientId?: Nullable<number>;
  caseId?: Nullable<number>;
  casebundlingId?: Nullable<number>;
  casebundlingType?: Nullable<string>;
  extractionId?: Nullable<string>;
  genaiPipelineVersion?: Nullable<string>;
  totalExtractions?: Nullable<number>;
  extractionStatus?: Nullable<Status>;
  validationStatus?: Nullable<Status>;
}

export class FileContract {
  _id?: Nullable<string>;
  schemaVersion?: Nullable<string>;
  metadata?: Nullable<MetaData>;
  ExtractionEvents?: Nullable<Nullable<ExtractionEvent>[]>;
  createdAt?: Nullable<string>;
  updatedAt?: Nullable<string>;
}

export class DeleteEventResponse {
  message?: Nullable<string>;
  status?: Nullable<boolean>;
}

export class CreateEventResponse {
  message?: Nullable<string>;
  status?: Nullable<boolean>;
}

export class UpdateEventResponse {
  data?: Nullable<ExtractionEvent>;
  message?: Nullable<string>;
  status?: Nullable<boolean>;
}

export abstract class IQuery {
  abstract getFileContract(id: string): Nullable<FileContract> | Promise<Nullable<FileContract>>;

  abstract getExtraction(
    extractionId: string,
  ): Nullable<FileContract> | Promise<Nullable<FileContract>>;

  abstract getSingleEvent(
    eventId?: Nullable<string>,
    filename?: Nullable<string>,
  ): Nullable<ExtractionEvent> | Promise<Nullable<ExtractionEvent>>;

  abstract patients(): Nullable<Nullable<Patient>[]> | Promise<Nullable<Nullable<Patient>[]>>;

  abstract patient(id: string): Nullable<Patient> | Promise<Nullable<Patient>>;
}

export abstract class IMutation {
  abstract deleteEventByEventId(
    eventId: string,
  ): Nullable<DeleteEventResponse> | Promise<Nullable<DeleteEventResponse>>;

  abstract createEvent(
    input: EventInput,
  ): Nullable<CreateEventResponse> | Promise<Nullable<CreateEventResponse>>;

  abstract updateEvent(
    eventId: string,
    input: EventInput,
  ): Nullable<UpdateEventResponse> | Promise<Nullable<UpdateEventResponse>>;
}

export class Patient {
  id?: Nullable<number>;
  name?: Nullable<string>;
  age?: Nullable<number>;
}

export type SourceUnion = Source | SourceString;
type Nullable<T> = T | null;

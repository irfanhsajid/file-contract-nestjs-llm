
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class InputListFileContracts {
    casebundlingIds?: Nullable<Nullable<number>[]>;
    patientIds?: Nullable<Nullable<number>[]>;
    eventTypes?: Nullable<Nullable<EventTypeScalar>[]>;
    validationStatuses?: Nullable<Nullable<string>[]>;
    projectNames?: Nullable<Nullable<string>[]>;
    cancerTypes?: Nullable<Nullable<string>[]>;
    page?: Nullable<number>;
    perPage?: Nullable<number>;
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
    productType?: Nullable<string>;
    coordinates?: Nullable<Nullable<string>[]>;
    sourceString?: Nullable<string>;
}

export class CreateExtractionResultInput {
    category: CategoryScalar;
    eventType: EventTypeScalar;
    eventDetail: string;
    llmExtraction?: Nullable<string>;
    reasoning?: Nullable<string>;
    patientId: number;
    casebundlingId: number;
    eventId?: Nullable<string>;
    model?: Nullable<string>;
    parserName?: Nullable<string>;
    codeLabel?: Nullable<string>;
    codeValue?: Nullable<string>;
    source?: Nullable<Nullable<SourceInput>[]>;
}

export class UpdateExtractionResultInput {
    category?: Nullable<CategoryScalar>;
    eventType?: Nullable<EventTypeScalar>;
    eventDetail?: Nullable<string>;
    llmExtraction?: Nullable<string>;
    reasoning?: Nullable<string>;
    patientId?: Nullable<number>;
    casebundlingId?: Nullable<number>;
    eventId?: Nullable<string>;
    model?: Nullable<string>;
    parserName?: Nullable<string>;
    codeLabel?: Nullable<string>;
    codeValue?: Nullable<string>;
    source?: Nullable<Nullable<SourceInput>[]>;
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
    productType?: Nullable<ProductTypeScalar>;
    coordinates?: Nullable<Nullable<string>[]>;
    sourceString?: Nullable<string>;
}

export class ExtractionResult {
    _id?: Nullable<string>;
    category?: Nullable<CategoryScalar>;
    eventType?: Nullable<EventTypeScalar>;
    eventDetail?: Nullable<string>;
    llmExtraction?: Nullable<string>;
    reasoning?: Nullable<string>;
    patientId?: Nullable<number>;
    eventId?: Nullable<string>;
    model?: Nullable<string>;
    parserName?: Nullable<string>;
    codeLabel?: Nullable<string>;
    codeValue?: Nullable<string>;
    source?: Nullable<Nullable<Source>[]>;
}

export class MetaData {
    projectName?: Nullable<string>;
    cancerType?: Nullable<string>;
    patientId?: Nullable<number>;
    caseId?: Nullable<number>;
    casebundlingId?: Nullable<number>;
    casebundlingType?: Nullable<string>;
    extractionId?: Nullable<string>;
    genaiPipelineVersion?: Nullable<string>;
    totalExtractions?: Nullable<number>;
    validationStatus?: Nullable<string>;
}

export class PaginatedFileContracts {
    items?: Nullable<Nullable<FileContract>[]>;
    total?: Nullable<number>;
    page?: Nullable<number>;
    perPage?: Nullable<number>;
}

export class FileContract {
    _id?: Nullable<string>;
    schemaVersion?: Nullable<string>;
    metadata?: Nullable<MetaData>;
    extractionResults?: Nullable<Nullable<ExtractionResult>[]>;
    createdAt?: Nullable<DateTime>;
}

export abstract class IQuery {
    abstract getFileContracts(input?: Nullable<InputListFileContracts>): Nullable<PaginatedFileContracts> | Promise<Nullable<PaginatedFileContracts>>;

    abstract patients(): Nullable<Nullable<Patient>[]> | Promise<Nullable<Nullable<Patient>[]>>;

    abstract patient(id: string): Nullable<Patient> | Promise<Nullable<Patient>>;
}

export abstract class IMutation {
    abstract processCleanIQResult(file: Upload): FileContract | Promise<FileContract>;

    abstract createExtractionResult(input: CreateExtractionResultInput): ExtractionResult | Promise<ExtractionResult>;

    abstract updateExtractionResult(extractionId: string, input: UpdateExtractionResultInput): ExtractionResult | Promise<ExtractionResult>;

    abstract deleteExtractionResult(extractionId: string): boolean | Promise<boolean>;
}

export class Patient {
    id?: Nullable<number>;
    name?: Nullable<string>;
    age?: Nullable<number>;
}

export type Upload = any;
export type DateTime = any;
export type EventTypeScalar = any;
export type CategoryScalar = any;
export type ProductTypeScalar = any;
type Nullable<T> = T | null;

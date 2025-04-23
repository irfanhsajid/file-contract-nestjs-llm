export declare class SourceInput {
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
    coordinates?: Nullable<CoordinatesInput>;
}
export declare class CoordinatesInput {
    page?: Nullable<number>;
    boundingBox?: Nullable<BoundingBoxInput>;
}
export declare class BoundingBoxInput {
    top?: Nullable<number>;
    left?: Nullable<number>;
    width?: Nullable<number>;
    height?: Nullable<number>;
}
export declare class ExtractionResultInput {
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
export declare class BoundingBox {
    top?: Nullable<number>;
    left?: Nullable<number>;
    width?: Nullable<number>;
    height?: Nullable<number>;
}
export declare class Coordinates {
    page?: Nullable<number>;
    boundingBox?: Nullable<BoundingBox>;
}
export declare class Source {
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
    coordinates?: Nullable<Coordinates>;
}
export declare class ExtractionResult {
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
    source?: Nullable<Source>;
}
export declare class MetaData {
    patientId?: Nullable<number>;
    caseId?: Nullable<number>;
    casebundlingId?: Nullable<number>;
    casebundlingType?: Nullable<string>;
    extractionId?: Nullable<string>;
    genaiPipelineVersion?: Nullable<string>;
    totalExtractions?: Nullable<number>;
    extractionStatus?: Nullable<string>;
    validationStatus?: Nullable<string>;
}
export declare class FileContract {
    _id?: Nullable<string>;
    schemaVersion?: Nullable<string>;
    metadata?: Nullable<MetaData>;
    extractionResults?: Nullable<Nullable<ExtractionResult>[]>;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
}
export declare class DeleteEventResponse {
    message?: Nullable<string>;
    status?: Nullable<boolean>;
}
export declare class CreateEventResponse {
    message?: Nullable<string>;
    status?: Nullable<boolean>;
}
export declare abstract class IQuery {
    abstract getFileContract(id: string): Nullable<FileContract> | Promise<Nullable<FileContract>>;
    abstract getExtraction(extractionId: string): Nullable<FileContract> | Promise<Nullable<FileContract>>;
    abstract getSingleEvent(eventId?: Nullable<string>, filename?: Nullable<string>): Nullable<ExtractionResult> | Promise<Nullable<ExtractionResult>>;
    abstract patients(): Nullable<Nullable<Patient>[]> | Promise<Nullable<Nullable<Patient>[]>>;
    abstract patient(id: string): Nullable<Patient> | Promise<Nullable<Patient>>;
}
export declare abstract class IMutation {
    abstract deleteEventByEventId(eventId: string): Nullable<DeleteEventResponse> | Promise<Nullable<DeleteEventResponse>>;
    abstract createEvent(event: ExtractionResultInput): Nullable<CreateEventResponse> | Promise<Nullable<CreateEventResponse>>;
}
export declare class Patient {
    id?: Nullable<number>;
    name?: Nullable<string>;
    age?: Nullable<number>;
}
type Nullable<T> = T | null;
export {};

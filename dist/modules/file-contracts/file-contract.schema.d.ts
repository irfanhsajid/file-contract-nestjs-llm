import mongoose, { Document } from 'mongoose';
export declare enum EProductType {
    EPIC = "epic",
    SIGNATERA = "signatera"
}
export declare enum EValidationStatus {
    COMPLETED = "completed",
    PENDING = "pending"
}
export declare enum EEventType {
    DemoGraphicData = "Demographic Data",
    CancerDiagnosis = "Cancer Diagnosis",
    TumorMetastasis = "Tumor Metastasis",
    GroupStage = "Group Stage",
    TNMStage = "TNM Stage",
    Surgery = "Surgery",
    CancerMedication = "Cancer Medication",
    Radiation = "Radiation",
    OtherProcedure = "Other Procedure",
    TumorResponseToTherapy = "Tumor Response to Therapy",
    CancerOutcome = "Cancer Outcome",
    Death = "Death",
    Biomarker = "Biomarker",
    ClinicalFollowUp = "Clinical Follow-Up"
}
export declare enum ECategory {
    Biomarker = "Biomarker",
    Condition = "Condition",
    Outcome = "Outcome",
    TherapeuticProcedure = "Therapeutic Procedure"
}
export declare class Source {
    similarityScore?: number;
    chunkId?: string;
    chunkNumber?: number;
    text?: string;
    textS3Link?: string;
    pageNumber?: number;
    documentId?: number;
    documentCategory?: string;
    totalPage?: number;
    filename?: string;
    testType?: string;
    productType?: string;
    coordinates?: string[];
    value?: string;
}
export declare const ExtractionResultCollectionName = "extraction_results";
export declare class ExtractionResult {
    _id: mongoose.Types.ObjectId;
    category: string;
    eventType: string;
    eventDetail: string;
    llmExtraction?: string;
    reasoning?: string;
    patientId: number;
    casebundlingId: number;
    eventId?: string;
    model?: string;
    parserName?: string;
    codeLabel?: string;
    codeValue?: string;
    source?: Source[];
    createdAt: Date;
}
export declare class MetaData {
    projectName: string;
    cancerType: string;
    patientId: number;
    caseId?: number;
    casebundlingId: number;
    casebundlingType?: string;
    extractionId: string;
    genaiPipelineVersion: string;
    totalExtractions: number;
    validationStatus: string;
}
export declare const FileContractCollectionName = "file_contracts";
export declare class FileContract {
    _id: mongoose.Types.ObjectId;
    schemaVersion: string;
    metadata: MetaData;
    extractionResults: mongoose.Types.ObjectId[];
    createdAt: Date;
}
export declare const SourceSchema: mongoose.Schema<Source, mongoose.Model<Source, any, any, any, mongoose.Document<unknown, any, Source> & Source & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Source, mongoose.Document<unknown, {}, mongoose.FlatRecord<Source>> & mongoose.FlatRecord<Source> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const ExtractionResultSchema: mongoose.Schema<ExtractionResult, mongoose.Model<ExtractionResult, any, any, any, mongoose.Document<unknown, any, ExtractionResult> & ExtractionResult & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ExtractionResult, mongoose.Document<unknown, {}, mongoose.FlatRecord<ExtractionResult>> & mongoose.FlatRecord<ExtractionResult> & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}>;
export declare const MetaDataSchema: mongoose.Schema<MetaData, mongoose.Model<MetaData, any, any, any, mongoose.Document<unknown, any, MetaData> & MetaData & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, MetaData, mongoose.Document<unknown, {}, mongoose.FlatRecord<MetaData>> & mongoose.FlatRecord<MetaData> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const FileContractSchema: mongoose.Schema<FileContract, mongoose.Model<FileContract, any, any, any, mongoose.Document<unknown, any, FileContract> & FileContract & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, FileContract, mongoose.Document<unknown, {}, mongoose.FlatRecord<FileContract>> & mongoose.FlatRecord<FileContract> & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}>;
export type ExtractionResultDocument = ExtractionResult & Document;
export type FileContractDocument = FileContract & Document;

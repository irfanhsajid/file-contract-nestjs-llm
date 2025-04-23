export interface IDocumentDateRange {
    start: string;
    end: string;
}
export declare enum EExtractionStatus {
    InProgress = "in_progress",
    Completed = "completed"
}
export declare enum EValidationStatus {
    InProgress = "in_progress",
    Completed = "completed"
}
export interface IMetaData {
    patient_id: number;
    case_id?: number | null;
    extraction_id: string;
    genai_pipeline_version: string;
    model: string;
    extraction_timestamp: string;
    total_extractions: number;
    document_date_range: IDocumentDateRange;
    extraction_status: EExtractionStatus;
    validation_status: EValidationStatus;
    last_modified_by: string;
    last_modified_at: string;
}

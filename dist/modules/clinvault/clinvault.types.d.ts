export declare class CreateEventInput {
    patientId: number;
    bundleId: number;
    caseId?: number;
    documentId: string;
    documentName: string;
    fromLIMS: boolean;
    eventId: string;
    category: string;
    eventType: string;
    eventDetail: string;
    codeLabel: string;
    codeSystem: string;
    cohort: string;
    abstractedDate: string;
}
export declare class PatientEventRecords {
    records: CreateEventInput[];
}

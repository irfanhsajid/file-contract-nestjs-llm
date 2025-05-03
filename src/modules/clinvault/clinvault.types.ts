export class CreateEventInput {
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
  abstractedDate: string; // Format: 02-24-25
}

export class PatientEventRecords {
  records: CreateEventInput[];
}

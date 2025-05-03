import { CustomScalar } from '@nestjs/graphql';
export declare const allowedEventTypes: readonly ["Demographic Data", "Cancer Diagnosis", "Tumor Metastasis", "Group Stage", "TNM Stage", "Surgery", "Cancer Medication", "Radiation", "Other Procedure", "Tumor Response to Therapy", "Cancer Outcome", "Death", "Biomarker", "Clinical Follow-Up"];
export declare class EventTypeScalar implements CustomScalar<string, string> {
    description: string;
    parseValue(value: string): string;
    serialize(value: string): string;
    parseLiteral(ast: any): any;
}

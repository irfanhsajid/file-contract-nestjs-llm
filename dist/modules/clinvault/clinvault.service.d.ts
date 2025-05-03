import { OrgAuthService } from './org-auth.service';
import { PatientEventRecords } from './clinvault.types';
export declare class ClinvaultService {
    private readonly orgAuthService;
    private readonly client;
    constructor(orgAuthService: OrgAuthService);
    pushEvents(events: PatientEventRecords[]): Promise<boolean>;
}

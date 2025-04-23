import { Patient } from 'src/graphql.schema';
import { PatientsService } from './patients.service';
export declare class PatientsResolver {
    private readonly patientService;
    constructor(patientService: PatientsService);
    patient(id: number): Promise<Patient>;
}

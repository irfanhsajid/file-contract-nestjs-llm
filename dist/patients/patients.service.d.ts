import { Patient } from 'src/graphql.schema';
export declare class PatientsService {
    findById(id: number): Promise<Patient>;
}

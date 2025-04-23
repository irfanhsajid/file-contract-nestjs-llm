import { Model } from 'mongoose';
import { ExtractionResult } from 'src/graphql.schema';
import { TFileContract } from './file-contract.schema';
export declare class FileContractService {
    private readonly fileContractModel;
    private logger;
    constructor(fileContractModel: Model<TFileContract>);
    getFileContract(id: string): Promise<TFileContract>;
    getExtraction(extractionId: string): Promise<TFileContract>;
    getSingleEvent({ eventId, filename, }: {
        filename?: string;
        eventId?: string;
    }): Promise<ExtractionResult>;
    deleteEventByEventId(eventId: string): Promise<{
        message: string;
        status: boolean;
    }>;
    createEvent(event: ExtractionResult): Promise<{
        message: string;
        status: boolean;
    }>;
}

import { CreateEventResponse, DeleteEventResponse, ExtractionResult, FileContract } from 'src/graphql.schema';
import { FileContractService } from './file-contract.service';
export declare class FileContractResolver {
    private readonly fileContractService;
    constructor(fileContractService: FileContractService);
    getFileContract(id: string): Promise<FileContract>;
    getExtraction(extractionId: string): Promise<FileContract>;
    getSingleEvent(eventId: string, filename: string): Promise<ExtractionResult>;
    deleteEventByEventId(eventId: string): Promise<DeleteEventResponse>;
    createEvent(event: ExtractionResult): Promise<CreateEventResponse>;
}

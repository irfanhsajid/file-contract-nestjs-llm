import { z } from 'zod';
import { zUploadFileSchema } from './file-contract.validator';
import { FileContractService } from './file-contract.service';
import { ExtractionResult, FileContract } from './file-contract.schema';
import { CreateExtractionResultInput, InputListFileContracts, PaginatedFileContracts, UpdateExtractionResultInput } from 'src/graphql.schema';
export declare class FileContractResolver {
    private readonly fileContractService;
    constructor(fileContractService: FileContractService);
    getFileContracts(input: InputListFileContracts): Promise<PaginatedFileContracts>;
    processCleanIQResult(data: z.infer<typeof zUploadFileSchema>): Promise<FileContract>;
    createExtractionResult(input: CreateExtractionResultInput): Promise<ExtractionResult>;
    updateExtractionResult(extractionId: string, input: UpdateExtractionResultInput): Promise<ExtractionResult>;
    deleteExtractionResult(extractionId: string): Promise<boolean>;
}

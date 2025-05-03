import { z } from 'zod';
import { Model } from 'mongoose';
import { zUploadFileSchema } from './file-contract.validator';
import { ExtractionResult, ExtractionResultDocument, FileContract, FileContractDocument } from './file-contract.schema';
import { CreateExtractionResultInput, InputListFileContracts, PaginatedFileContracts, UpdateExtractionResultInput } from 'src/graphql.schema';
export declare class FileContractService {
    private readonly fileContractModel;
    private extractionResultModel;
    private logger;
    private readonly DEFAULT_PAGE;
    private readonly DEFAULT_PER_PAGE;
    constructor(fileContractModel: Model<FileContractDocument>, extractionResultModel: Model<ExtractionResultDocument>);
    private getFilteredFileContracts;
    getFileContracts(input: InputListFileContracts): Promise<PaginatedFileContracts>;
    private parseJsonFile;
    private createExtractionResultSources;
    processCleanIQResult({ file }: z.infer<typeof zUploadFileSchema>): Promise<FileContract>;
    createExtractionResult(input: CreateExtractionResultInput): Promise<ExtractionResult>;
    updateExtractionResult(extractionId: string, input: UpdateExtractionResultInput): Promise<ExtractionResult>;
    deleteExtractionResult(extractionId: string): Promise<boolean>;
}

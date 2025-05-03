import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
import { z } from 'zod';

import { zUploadFileSchema } from './file-contract.validator';
import { FileContractService } from './file-contract.service';
import { ExtractionResult, FileContract } from './file-contract.schema';
import {
  CreateExtractionResultInput,
  InputListFileContracts,
  PaginatedFileContracts,
  UpdateExtractionResultInput,
} from 'src/graphql.schema';

@Resolver('FileContract')
export class FileContractResolver {
  constructor(private readonly fileContractService: FileContractService) {}

  @Query(() => PaginatedFileContracts, { name: 'getFileContracts' })
  async getFileContracts(
    @Args({ name: 'input', type: () => String })
    input: InputListFileContracts,
  ): Promise<PaginatedFileContracts> {
    return this.fileContractService.getFileContracts(input);
  }

  @Mutation(() => FileContract, { name: 'processCleanIQResult' })
  async processCleanIQResult(
    @Args({ name: 'file', type: () => GraphQLUpload })
    data: z.infer<typeof zUploadFileSchema>,
  ) {
    return this.fileContractService.processCleanIQResult(data);
  }

  @Mutation(() => ExtractionResult)
  async createExtractionResult(
    @Args('input') input: CreateExtractionResultInput,
  ): Promise<ExtractionResult> {
    return this.fileContractService.createExtractionResult(input);
  }

  @Mutation(() => ExtractionResult)
  async updateExtractionResult(
    @Args('extractionId') extractionId: string,
    @Args('input') input: UpdateExtractionResultInput,
  ): Promise<ExtractionResult> {
    return this.fileContractService.updateExtractionResult(extractionId, input);
  }

  @Mutation(() => Boolean)
  async deleteExtractionResult(@Args('extractionId') extractionId: string): Promise<boolean> {
    return this.fileContractService.deleteExtractionResult(extractionId);
  }
}

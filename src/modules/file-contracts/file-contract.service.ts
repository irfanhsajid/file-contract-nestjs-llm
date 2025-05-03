import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { z } from 'zod';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, PipelineStage } from 'mongoose';
import _ from 'lodash';

import { toCamelCaseKeys } from 'src/utils/toCamelCaseKeys';

import {
  zUploadFileSchema,
  zFileContractSchema,
  zExtractionResultSchema,
} from './file-contract.validator';
import {
  ExtractionResult,
  ExtractionResultDocument,
  FileContract,
  FileContractDocument,
  ExtractionResultCollectionName,
} from './file-contract.schema';
import {
  CreateExtractionResultInput,
  InputListFileContracts,
  PaginatedFileContracts,
  UpdateExtractionResultInput,
} from 'src/graphql.schema';

@Injectable()
export class FileContractService {
  private logger = new Logger(FileContractService.name);
  private readonly DEFAULT_PAGE = 1;
  private readonly DEFAULT_PER_PAGE = 16;

  constructor(
    @InjectModel(FileContract.name)
    private readonly fileContractModel: Model<FileContractDocument>,
    @InjectModel(ExtractionResult.name)
    private extractionResultModel: Model<ExtractionResultDocument>,
  ) {}

  private getFilteredFileContracts(input: InputListFileContracts): {
    itemsPipeline: PipelineStage[];
    totalCountPipeline: PipelineStage[];
  } {
    const {
      casebundlingIds,
      patientIds,
      eventTypes,
      validationStatuses,
      cancerTypes,
      projectNames,
      page,
      perPage,
    } = input;

    const _page: number = page || this.DEFAULT_PAGE;
    const _perPage: number = perPage || this.DEFAULT_PER_PAGE;

    const rootMatches: Record<string, any> = {
      ...(casebundlingIds &&
        casebundlingIds.length > 0 && {
          'metadata.casebundlingId': { $in: casebundlingIds },
        }),
      ...(cancerTypes &&
        cancerTypes.length > 0 && {
          'metadata.cancerType': { $in: cancerTypes },
        }),
      ...(projectNames &&
        projectNames.length > 0 && {
          'metadata.projectName': { $in: projectNames },
        }),
      ...(patientIds &&
        patientIds.length > 0 && {
          'metadata.patientId': { $in: patientIds },
        }),
      ...(validationStatuses &&
        validationStatuses.length > 0 && {
          'metadata.validationStatus': { $in: validationStatuses },
        }),
    };

    const extractionResultsMatches: Record<string, any> = {
      ...(eventTypes &&
        eventTypes.length > 0 && {
          'extractionResults.eventType': { $in: eventTypes },
        }),
    };

    const basedPipeline: PipelineStage[] = [
      { $match: rootMatches },
      {
        $lookup: {
          from: ExtractionResultCollectionName,
          localField: 'extractionResults',
          foreignField: '_id',
          as: 'extractionResults',
        },
      },
      { $unwind: '$extractionResults' },
      {
        $match: extractionResultsMatches,
      },
    ];

    // 2 pipelines, 1 for items and 1 for total count
    // DocumentDb does not support $facet
    // Create two separate pipelines - one for items and one for count
    const itemsPipeline: PipelineStage[] = [
      ...basedPipeline,
      {
        $group: {
          _id: '$_id',
          schemaVersion: { $first: '$schemaVersion' },
          metadata: { $first: '$metadata' },
          extractionResults: { $push: '$extractionResults' },
          createdAt: { $first: '$createdAt' },
        },
      },
      { $skip: (_page - 1) * _perPage },
      { $limit: _perPage },
    ];

    const totalCountPipeline: PipelineStage[] = [
      ...basedPipeline,
      {
        $group: {
          _id: '$_id',
        },
      },
      { $count: 'total' },
    ];

    return { itemsPipeline, totalCountPipeline };
  }

  async getFileContracts(input: InputListFileContracts): Promise<PaginatedFileContracts> {
    const { itemsPipeline, totalCountPipeline } = this.getFilteredFileContracts(input);
    this.logger.log(
      `Fetching file contract with filters: ${JSON.stringify({ itemsPipeline, totalCountPipeline })}`,
    );

    // Execute both pipelines separately
    const [items, countResult] = await Promise.all([
      this.fileContractModel.aggregate(itemsPipeline).exec(),
      this.fileContractModel.aggregate(totalCountPipeline).exec(),
    ]);

    // Extract the count from the result
    const total = countResult.length > 0 ? countResult[0].total : 0;

    return {
      items,
      total,
      page: input.page || this.DEFAULT_PAGE,
      perPage: input.perPage || this.DEFAULT_PER_PAGE,
    };
  }

  private parseJsonFile(data: string) {
    try {
      return toCamelCaseKeys(JSON.parse(data));
    } catch (error) {
      this.logger.error('Error parsing JSON file', error);
      throw new BadRequestException('Invalid JSON format');
    }
  }

  private createExtractionResultSources(casebundlingId: number) {
    return ({
      source,
      ...result
    }: z.infer<typeof zExtractionResultSchema>): Promise<ExtractionResult> => {
      const extractionResult = new this.extractionResultModel({
        ...result,
        ...(source &&
          Array.isArray(source) &&
          source.length > 0 && {
            // Mapped single source strings to object
            source: source.map((src) => {
              if (typeof src === 'string') {
                return { sourceString: src };
              }
              return src;
            }),
          }),
        _id: new mongoose.Types.ObjectId(),
        casebundlingId,
      });
      return extractionResult.save();
    };
  }

  async processCleanIQResult({ file }: z.infer<typeof zUploadFileSchema>): Promise<FileContract> {
    const { createReadStream } = file;

    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = []; // Collect all chunks of data

      return createReadStream()
        .on('data', (chunk: Buffer) => {
          chunks.push(chunk); // Collect chunks
        })
        .on('end', async () => {
          const _data = Buffer.concat(chunks).toString('utf-8'); // Combine all chunks

          const camelCaseInput = this.parseJsonFile(_data); // Parse and convert to camelCase
          this.logger.log(
            `Parsed and converted input to camelCase: ${JSON.stringify(camelCaseInput)}`,
          );

          const parsed = zFileContractSchema.safeParse(camelCaseInput);
          if (!parsed.success) {
            this.logger.error('Validation failed', parsed.error.format());
            reject(new BadRequestException('Invalid file format'));
            return;
          }

          const extractionResults: ExtractionResult[] = await Promise.all(
            parsed.data.extractionResults.map(
              this.createExtractionResultSources(parsed.data.metadata.casebundlingId),
            ),
          );

          const fileContractData: FileContract = {
            _id: new mongoose.Types.ObjectId(),
            schemaVersion: parsed.data.schemaVersion,
            metadata: {
              ...parsed.data.metadata,
              caseId: parsed.data.metadata.caseId ?? undefined, // Ensure caseId is undefined if null
              casebundlingType: parsed.data.metadata.casebundlingType ?? undefined, // Ensure casebundlingType is undefined if null
            },
            extractionResults: extractionResults.map((result) => result._id),
            createdAt: new Date(),
          };

          const createdFileContract = new this.fileContractModel(fileContractData);
          await createdFileContract.save();
          this.logger.log(`File contract created with ID: ${createdFileContract._id.toString()}`);

          const _result = await createdFileContract.populate('extractionResults');
          resolve(_result);
        })
        .on('error', (error: Error) => {
          this.logger.error('Error reading file', error);
          reject(error);
        });
    });
  }

  async createExtractionResult(input: CreateExtractionResultInput): Promise<ExtractionResult> {
    const { casebundlingId, patientId } = input;

    // 1. Find the file contract and update its extractionResults array, validate existence
    const fileContract = await this.fileContractModel.findOne({
      'metadata.casebundlingId': casebundlingId,
      'metadata.patientId': patientId,
    });

    if (!fileContract) {
      throw new NotFoundException(
        `No FileContract found for casebundlingId: ${casebundlingId} and patientId: ${patientId}`,
      );
    }

    const extractionResult = new this.extractionResultModel({
      ...input,
      _id: new mongoose.Types.ObjectId(),
    });

    // Save the extraction result
    const savedResult = await extractionResult.save();

    // Add the new extraction result to the file contract
    fileContract.extractionResults.push(savedResult._id);
    await fileContract.save();

    this.logger.log(
      `Added ExtractionResult ${savedResult._id.toString()} to FileContract ${fileContract._id.toString()}`,
    );

    return savedResult;
  }

  async updateExtractionResult(
    extractionId: string,
    input: UpdateExtractionResultInput,
  ): Promise<ExtractionResult> {
    this.logger.log(
      `Fetching extraction with _id: ${extractionId} and input: ${JSON.stringify(input)}`,
    );
    const _extractionId = new mongoose.Types.ObjectId(extractionId);
    const updatedResult = await this.extractionResultModel
      .findByIdAndUpdate(_extractionId, { $set: input }, { new: true })
      .exec();

    if (!updatedResult) {
      throw new NotFoundException(`ExtractionResult with _id: ${extractionId} not found`);
    }

    return updatedResult;
  }

  async deleteExtractionResult(extractionId: string): Promise<boolean> {
    const _extractionId = new mongoose.Types.ObjectId(extractionId);
    const result = await this.extractionResultModel.findByIdAndDelete(_extractionId).exec();

    if (!result) {
      throw new NotFoundException(`ExtractionResult with _id: ${extractionId} not found`);
    }

    // Remove the reference from any FileContract documents
    await this.fileContractModel.updateMany(
      { extractionResults: _extractionId },
      { $pull: { extractionResults: _extractionId } },
    );

    return true;
  }
}

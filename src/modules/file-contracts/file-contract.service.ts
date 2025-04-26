import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import _ from 'lodash';
import { Model } from 'mongoose';
import { ExtractionEvent, ProductType, Source, UpdateEventResponse } from 'src/graphql.schema';
import { snakeToCamelCaseKeys } from 'src/utils/snakeToCamelCaseKeys';
import { FileContractToken, TFileContract } from './file-contract.schema';

@Injectable()
export class FileContractService {
  private logger = new Logger(FileContractService.name);

  constructor(
    @InjectModel(FileContractToken) private readonly fileContractModel: Model<TFileContract>,
  ) {}

  // get file contract by id(ObjectId)
  async getFileContract(id: string): Promise<TFileContract> {
    this.logger.log(`Fetching file contract with ID: ${id}`);
    const fileContract = await this.fileContractModel.findById(id).lean();
    if (!fileContract) {
      this.logger.error(`No file contract found for ID: ${id}`);
      throw new NotFoundException('File contract not found');
    }
    // after getting data, convert snake_case keys to camelCase for GraphQL Query
    const camelCasedContractData = snakeToCamelCaseKeys(fileContract) as TFileContract;
    return camelCasedContractData;
  }

  // get extraction by extraction_id
  async getExtraction(extractionId: string): Promise<TFileContract> {
    const query = { 'metadata.extractionId': extractionId };
    const fileContract = await this.fileContractModel.findOne(query).lean();
    if (!fileContract) {
      this.logger.error(`No file contract found for ID: ${extractionId}`);
      throw new NotFoundException('File contract not found');
    }
    // after getting data, convert snake_case keys to camelCase for GraphQL Query
    const camelCasedContractData = snakeToCamelCaseKeys(fileContract) as TFileContract;
    return camelCasedContractData;
  }

  // get event details by using event_id or source filename
  async getSingleEvent({
    eventId,
    filename,
  }: {
    filename?: string;
    eventId?: string;
  }): Promise<ExtractionEvent> {
    // Validate input: At least one parameter must be provided
    if (!filename && !eventId) {
      this.logger.error('At least one of filename, or eventId must be provided');
      throw new NotFoundException(
        'At least one of extractionId, filename, or eventId must be provided',
      );
    }
    const query: any = {};
    if (filename) {
      this.logger.log(`Fetching extraction with filename: ${filename}`);
      query['extractionResults.source.filename'] = filename;
    }
    if (eventId) {
      this.logger.log(`Fetching extraction with eventId: ${eventId}`);
      query['extractionResults.eventId'] = eventId;
    }
    const fileContract = await this.fileContractModel.findOne(query).lean();

    if (!fileContract) {
      this.logger.error(`No file contract found for query: ${JSON.stringify(query)}`);
      throw new NotFoundException('File contract not found');
    }
    // Use Lodash chain to filter and extract the matching extraction result
    const matchingExtraction = _.chain([fileContract])
      .flatMap((fc) => fc.extractionResults || [])
      .filter({
        ...(eventId && { eventId: eventId }),
        ...(filename && { source: { filename } }),
      })
      .first()
      .value();

    if (!matchingExtraction) {
      this.logger.error(`No extraction result found for query: ${JSON.stringify(query)}`);
      throw new NotFoundException('Extraction result not found');
    }
    // Convert snake_case to camelCase
    const camelCasedExtraction = snakeToCamelCaseKeys(matchingExtraction) as ExtractionEvent;
    return camelCasedExtraction;
  }

  //delete single event by event_id
  async deleteEventByEventId(eventId: string): Promise<{ message: string; status: boolean }> {
    if (!eventId) {
      this.logger.error('eventId must be provided');
      throw new NotFoundException('eventId must be provided');
    }
    await this.fileContractModel.updateOne(
      { 'extractionResults.eventId': eventId },
      { $pull: { extractionResults: { eventId: eventId } } },
    );

    this.logger.log(`Successfully deleted eventId ${eventId} from extractionResults`);

    return {
      message: `Event with eventId ${eventId} deleted successfully`,
      status: true,
    };
  }

  // create a event inside extraction_results
  async createEvent(input: ExtractionEvent): Promise<{ message: string; status: boolean }> {
    const {
      patientId,
      eventId,
      category,
      eventType,
      eventDetail,
      llmExtraction,
      reasoning,
      model,
      parserName,
      codeLabel,
      codeValue,
      source,
    } = input;
    // Query the FileContract by patientId in metadata
    const query = { 'metadata.patientId': patientId };

    // Check if the document exists
    const originalDocument = await this.fileContractModel.findOne(query).lean();
    if (!originalDocument) {
      this.logger.error(`No FileContract found for patientId: ${patientId}`);
      throw new NotFoundException(`No FileContract found for patientId: ${patientId}`);
    }
    this.logger.log(`Original document: ${JSON.stringify(originalDocument, null, 2)}`);

    // Check if eventId already exists
    const existingEvent = originalDocument.extractionResults.find(
      (result: any) => result.eventId === eventId,
    );
    if (existingEvent) {
      this.logger.error(`Event with eventId: ${eventId} already exists`);
      throw new NotFoundException(`Event with eventId: ${eventId} already exists`);
    }

    // Handle SourceUnion for the source field
    let sourceData: { value: string } | Source;
    if (source && 'value' in source && source.value) {
      // SourceString case (ensure value is a string)
      sourceData = { value: source.value };
    } else if (source) {
      // Source case
      sourceData = {
        similarityScore: (source as Source).similarityScore ?? null,
        chunkId: (source as Source).chunkId ?? null,
        chunkNumber: (source as Source).chunkNumber ?? null,
        text: (source as Source).text ?? null,
        textS3Link: (source as Source).textS3Link ?? null,
        pageNumber: (source as Source).pageNumber ?? null,
        documentId: (source as Source).documentId ?? null,
        documentCategory: (source as Source).documentCategory ?? null,
        totalPage: (source as Source).totalPage ?? null,
        filename: (source as Source).filename ?? null,
        testType: (source as Source).testType ?? null,
        productType: (source as Source).productType ?? null,
        coordinates: (source as Source).coordinates ?? null,
      };
    } else {
      // Handle null or invalid source
      sourceData = { value: '' }; // Default to empty SourceString per database schema
    }

    const newEvent = {
      eventId,
      eventType,
      category,
      patientId,
      eventDetail,
      llmExtraction,
      reasoning,
      model,
      parserName,
      codeLabel,
      codeValue,
      source: sourceData,
    };

    // Update: Push the new event and increment totalExtractions
    const update = {
      $push: { extractionResults: newEvent },
      $inc: { 'metadata.totalExtractions': 1 },
    };

    this.logger.log(`Executing query: ${JSON.stringify(query)}`);
    this.logger.log(`Executing update: ${JSON.stringify(update)}`);

    const updateResult = await this.fileContractModel.updateOne(query, update, {
      writeConcern: { w: 'majority', j: true },
    });

    this.logger.log(`Update result: ${JSON.stringify(updateResult, null, 2)}`);

    if (updateResult.matchedCount === 0) {
      this.logger.error(`Failed to match FileContract for patientId: ${patientId}`);
      throw new NotFoundException(`Failed to match FileContract for patientId: ${patientId}`);
    }

    if (updateResult.modifiedCount === 0) {
      this.logger.warn(`No modifications made for FileContract with patientId: ${patientId}`);
    }

    // Fetch the updated document to verify
    const updatedDocument = await this.fileContractModel.findOne(query).lean();
    if (!updatedDocument) {
      this.logger.error(`Failed to fetch updated FileContract for patientId: ${patientId}`);
      throw new NotFoundException(
        `Failed to fetch updated FileContract for patientId: ${patientId}`,
      );
    }
    this.logger.log(`Updated document: ${JSON.stringify(updatedDocument, null, 2)}`);

    // Verify the new event was added
    const addedEvent = updatedDocument.extractionResults.find(
      (result: any) => result.eventId === eventId,
    );
    if (!addedEvent) {
      this.logger.error(`Event with eventId: ${eventId} was not added to extractionResults`);
      throw new NotFoundException(
        `Event with eventId: ${eventId} was not added to extractionResults`,
      );
    }

    return {
      message: `Event with eventId ${eventId} created successfully`,
      status: true,
    };
  }

  // Edit event by eventId
  async updateEvent(eventId: string, input: ExtractionEvent): Promise<UpdateEventResponse> {
    if (!eventId) {
      this.logger.error('eventId must be provided');
      throw new BadRequestException('Event ID must be provided');
    }

    if (!input || Object.keys(input).length === 0) {
      this.logger.error('Event data must be provided');
      throw new BadRequestException('Event data must be provided');
    }

    // Validate that eventId matches
    if (input.eventId && input.eventId !== eventId) {
      this.logger.error(
        `Event ID mismatch: provided ${eventId}, input data contains ${input.eventId}`,
      );
      throw new BadRequestException('Event ID in data must match the provided eventId');
    }

    // Prepare the update object for extractionResults
    const updateFields: { [key: string]: any } = {
      'extractionResults.$.eventType': input.eventType ?? null,
      'extractionResults.$.category': input.category ?? null,
      'extractionResults.$.eventDetail': input.eventDetail ?? null,
      'extractionResults.$.llmExtraction': input.llmExtraction ?? null,
      'extractionResults.$.reasoning': input.reasoning ?? null,
      'extractionResults.$.model': input.model ?? null,
      'extractionResults.$.parserName': input.parserName ?? null,
      'extractionResults.$.codeLabel': input.codeLabel ?? null,
      'extractionResults.$.codeValue': input.codeValue ?? null,
    };

    // Add source fields if provided
    if (input.source) {
      let sourceData: { value: string } | Source;
      if ('value' in input.source && input.source.value) {
        // SourceString case (ensure value is a string)
        sourceData = { value: input.source.value };
      } else if (input.source) {
        // Source case
        sourceData = {
          similarityScore: (input.source as Source).similarityScore ?? null,
          chunkId: (input.source as Source).chunkId ?? null,
          chunkNumber: (input.source as Source).chunkNumber ?? null,
          text: (input.source as Source).text ?? null,
          textS3Link: (input.source as Source).textS3Link ?? null,
          pageNumber: (input.source as Source).pageNumber ?? null,
          documentId: (input.source as Source).documentId ?? null,
          documentCategory: (input.source as Source).documentCategory ?? null,
          totalPage: (input.source as Source).totalPage ?? null,
          filename: (input.source as Source).filename ?? null,
          testType: (input.source as Source).testType ?? null,
          productType: (input.source as Source).productType ?? null,
          coordinates: (input.source as Source).coordinates ?? null,
        };
      } else {
        // Handle null or invalid source
        sourceData = { value: '' }; // Default to empty SourceString per database schema
      }
      updateFields['extractionResults.$.source'] = sourceData;
    }

    // Perform the update
    const updateResult = await this.fileContractModel.updateOne(
      { 'extractionResults.eventId': eventId },
      { $set: updateFields },
      { writeConcern: { w: 'majority', j: true } },
    );

    this.logger.log(
      `Update result for eventId ${eventId}: ${JSON.stringify(updateResult, null, 2)}`,
    );

    if (updateResult.matchedCount === 0) {
      this.logger.error(`No event found with eventId: ${eventId}`);
      throw new NotFoundException(`Event with eventId ${eventId} not found`);
    }

    if (updateResult.modifiedCount === 0) {
      this.logger.warn(`No changes made to event with eventId: ${eventId}`);
    }

    // Fetch the updated document to retrieve the modified event
    const updatedDocument = await this.fileContractModel
      .findOne({ 'extractionResults.eventId': eventId })
      .lean();

    if (!updatedDocument) {
      this.logger.error(`Failed to fetch updated document for eventId: ${eventId}`);
      throw new NotFoundException(`Failed to fetch updated document for eventId: ${eventId}`);
    }

    // Find the updated event in extractionResults
    const updatedEventRaw = updatedDocument.extractionResults.find(
      (result: any) => result.eventId === eventId,
    );

    if (!updatedEventRaw) {
      this.logger.error(`Updated event with eventId: ${eventId} not found in extractionResults`);
      throw new NotFoundException(`Updated event with eventId: ${eventId} not found`);
    }

    // Convert raw MongoDB document to ExtractionEvent
    const updatedEvent: ExtractionEvent = {
      ...updatedEventRaw,
      source: updatedEventRaw.source
        ? 'value' in updatedEventRaw.source
          ? { value: updatedEventRaw.source.value ?? '' }
          : {
              similarityScore: updatedEventRaw.source.similarityScore ?? null,
              chunkId: updatedEventRaw.source.chunkId ?? null,
              chunkNumber: updatedEventRaw.source.chunkNumber ?? null,
              text: updatedEventRaw.source.text ?? null,
              textS3Link: updatedEventRaw.source.textS3Link ?? null,
              pageNumber: updatedEventRaw.source.pageNumber ?? null,
              documentId: updatedEventRaw.source.documentId ?? null,
              documentCategory: updatedEventRaw.source.documentCategory ?? null,
              totalPage: updatedEventRaw.source.totalPage ?? null,
              filename: updatedEventRaw.source.filename ?? null,
              testType: updatedEventRaw.source.testType ?? null,
              productType: (updatedEventRaw.source.productType as ProductType) ?? null,
              coordinates: updatedEventRaw.source.coordinates ?? null,
            }
        : null,
    };

    this.logger.log(`Successfully edited eventId ${eventId} in extractionResults`);

    return {
      message: `Event with eventId ${eventId} updated successfully`,
      status: true,
      data: updatedEvent,
    };
  }
}

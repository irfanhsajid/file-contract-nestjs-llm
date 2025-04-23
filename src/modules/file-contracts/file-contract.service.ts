import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import _ from 'lodash';
import { Model } from 'mongoose';
import { ExtractionResult } from 'src/graphql.schema';
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
    const query = { 'metadata.extraction_id': extractionId };
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
  }): Promise<ExtractionResult> {
    // Validate input: At least one parameter must be provided
    if (!filename && !eventId) {
      this.logger.error('At least one of filename, or eventId must be provided');
      throw new NotFoundException(
        'At least one of extractionId, filename, or eventId must be provided',
      );
    }

    // Build the query
    const query: any = {};

    if (filename) {
      this.logger.log(`Fetching extraction with filename: ${filename}`);
      query['extraction_results.Source.filename'] = filename;
    }

    if (eventId) {
      this.logger.log(`Fetching extraction with eventId: ${eventId}`);
      query['extraction_results.event_id'] = eventId;
    }
    // Execute the query
    const fileContract = await this.fileContractModel.findOne(query).lean();

    if (!fileContract) {
      this.logger.error(`No file contract found for query: ${JSON.stringify(query)}`);
      throw new NotFoundException('File contract not found');
    }
    // Use Lodash chain to filter and extract the matching extraction result
    const matchingExtraction = _.chain([fileContract])
      // @ts-ignore
      .flatMap((fc) => fc.extraction_results || []) // Flatten extraction_results
      .filter({
        ...(eventId && { event_id: eventId }), // Match event_id
        ...(filename && { Source: { filename } }), // Match Source.filename
      })
      .first()
      .value();

    if (!matchingExtraction) {
      this.logger.error(`No extraction result found for query: ${JSON.stringify(query)}`);
      throw new NotFoundException('Extraction result not found');
    }

    // Convert snake_case to camelCase
    const camelCasedExtraction = snakeToCamelCaseKeys(matchingExtraction) as ExtractionResult;
    // this.logger.log(`Camel cased extraction: ${JSON.stringify(camelCasedExtraction)}`);
    return camelCasedExtraction;
  }

  //delete single event by event_id
  async deleteEventByEventId(eventId: string): Promise<{ message: string; status: boolean }> {
    if (!eventId) {
      this.logger.error('eventId must be provided');
      throw new NotFoundException('eventId must be provided');
    }

    const updatedDoc = await this.fileContractModel.findOneAndUpdate(
      { 'extraction_results.event_id': eventId },
      { $pull: { extraction_results: { event_id: eventId } } },
      { new: true },
    );
    console.log('updated doc', updatedDoc);

    const camelCasedData = snakeToCamelCaseKeys(updatedDoc);
    console.log('camelcasedata', camelCasedData);

    await camelCasedData.save();

    this.logger.log(`Successfully deleted eventId ${eventId} from extraction_results`);

    return {
      message: `Event with eventId ${eventId} deleted successfully`,
      status: true,
    };
  }

  // create event
  async createEvent(event: ExtractionResult): Promise<{ message: string; status: boolean }> {
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
    } = event;

    // Query the FileContract by patient_id in metadata
    const query = { 'metadata.patient_id': patientId };

    // Check if the document exists
    const originalDocument = await this.fileContractModel.findOne(query).lean();
    if (!originalDocument) {
      this.logger.error(`No FileContract found for patientId: ${patientId}`);
      throw new NotFoundException(`No FileContract found for patientId: ${patientId}`);
    }
    this.logger.log(`Original document: ${JSON.stringify(originalDocument, null, 2)}`);

    // Check if eventId already exists
    // @ts-ignore
    const existingEvent = originalDocument.extraction_results.find(
      (result: any) => result.event_id === eventId,
    );

    // Prepare the new ExtractionResult object (snake_case for database)
    const newEvent = {
      category,
      event_type: eventType,
      event_detail: eventDetail,
      llm_extraction: llmExtraction,
      reasoning,
      patient_id: patientId,
      event_id: eventId,
      model: model || null,
      parser_name: parserName || null,
      code_label: codeLabel || null,
      code_value: codeValue || null,
      Source: source || null,
    };

    // Update: Push the new event and increment total_extractions
    const update = {
      $push: { extraction_results: newEvent },
      $inc: { 'metadata.total_extractions': 1 },
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
      this.logger.error(`Failed to update FileContract for patientId: ${patientId}`);
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
    // @ts-ignore
    const addedEvent = updatedDocument.extraction_results.find(
      (result: any) => result.event_id === eventId,
    );
    if (!addedEvent) {
      this.logger.error(`Event with eventId: ${eventId} was not added to extraction_results`);
    }
    return {
      message: `Event with eventId ${eventId} created successfully`,
      status: true,
    };
  }
}

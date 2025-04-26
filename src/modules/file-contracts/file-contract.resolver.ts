import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateEventResponse,
  DeleteEventResponse,
  ExtractionEvent,
  FileContract,
  UpdateEventResponse,
} from 'src/graphql.schema';
import { FileContractService } from './file-contract.service';

@Resolver()
export class FileContractResolver {
  constructor(private readonly fileContractService: FileContractService) {}
  @Query(() => FileContract)
  async getFileContract(
    @Args({ name: 'id', type: () => String })
    id: string,
  ): Promise<FileContract> {
    const fileContract = await this.fileContractService.getFileContract(id);
    return fileContract as FileContract;
  }
  @Query(() => FileContract)
  async getExtraction(
    @Args({ name: 'extractionId', type: () => String })
    extractionId: string,
  ): Promise<FileContract> {
    const fileContract = await this.fileContractService.getExtraction(extractionId);
    return fileContract as FileContract;
  }
  @Query(() => ExtractionEvent)
  async getSingleEvent(
    @Args({ name: 'eventId', type: () => String })
    eventId: string,
    @Args({ name: 'filename', type: () => String })
    filename: string,
  ): Promise<ExtractionEvent> {
    const ExtractionEvent = await this.fileContractService.getSingleEvent({
      eventId,
      filename,
    });
    return ExtractionEvent;
  }
  @Mutation(() => DeleteEventResponse)
  async deleteEventByEventId(
    @Args({ name: 'eventId', type: () => String }) eventId: string,
  ): Promise<DeleteEventResponse> {
    const response = await this.fileContractService.deleteEventByEventId(eventId);
    console.log('Delete response in resolver:', JSON.stringify(response, null, 2));
    return response;
  }

  @Mutation(() => CreateEventResponse)
  async createEvent(
    @Args({ name: 'input', type: () => ExtractionEvent }) input: ExtractionEvent,
  ): Promise<CreateEventResponse> {
    const response = await this.fileContractService.createEvent(input);
    console.log('Create response in resolver:', JSON.stringify(response, null, 2));
    return response;
  }

  @Mutation(() => UpdateEventResponse)
  async updateEvent(
    @Args({ name: 'eventId', type: () => String }) eventId: string,
    @Args({ name: 'input', type: () => ExtractionEvent }) input: ExtractionEvent,
  ): Promise<UpdateEventResponse> {
    const response = await this.fileContractService.updateEvent(eventId, input);
    console.log('Edit response in resolver:', JSON.stringify(response, null, 2));
    return response;
  }
}

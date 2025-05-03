import { Injectable } from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';
import { OrgAuthService } from './org-auth.service';
import { mutationPushEvents } from './clinvault.mutation';
import { PatientEventRecords } from './clinvault.types';

@Injectable()
export class ClinvaultService {
  private readonly client: GraphQLClient;

  constructor(private readonly orgAuthService: OrgAuthService) {
    this.client = new GraphQLClient(
      process.env.API_CLINVAULT_URL ?? 'http://localhost:3000/graphql',
      {
        requestMiddleware: async (request) => {
          const token = await orgAuthService.getAccessToken();
          (request.headers as Headers)?.append('Authorization', `Bearer ${token}`);
          return request;
        },
      },
    );
  }

  async pushEvents(events: PatientEventRecords[]) {
    try {
      await this.client.request(mutationPushEvents, {
        events: events,
      });
    } catch (e) {
      console.error(e);
      return false;
    }
    return true;
  }
}

import { gql } from 'graphql-request';

export const mutationPushEvents = gql`
  mutation PushEvents($events: [PatientEventRecords]) {
    pushEvents(events: $events) {
      id
      failureReason
      status
    }
  }
`;

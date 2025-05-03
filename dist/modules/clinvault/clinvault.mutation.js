"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutationPushEvents = void 0;
const graphql_request_1 = require("graphql-request");
exports.mutationPushEvents = (0, graphql_request_1.gql) `
  mutation PushEvents($events: [PatientEventRecords]) {
    pushEvents(events: $events) {
      id
      failureReason
      status
    }
  }
`;
//# sourceMappingURL=clinvault.mutation.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClinvaultService = void 0;
const common_1 = require("@nestjs/common");
const graphql_request_1 = require("graphql-request");
const org_auth_service_1 = require("./org-auth.service");
const clinvault_mutation_1 = require("./clinvault.mutation");
let ClinvaultService = class ClinvaultService {
    constructor(orgAuthService) {
        this.orgAuthService = orgAuthService;
        this.client = new graphql_request_1.GraphQLClient(process.env.API_CLINVAULT_URL ?? 'http://localhost:3000/graphql', {
            requestMiddleware: async (request) => {
                const token = await orgAuthService.getAccessToken();
                request.headers?.append('Authorization', `Bearer ${token}`);
                return request;
            },
        });
    }
    async pushEvents(events) {
        try {
            await this.client.request(clinvault_mutation_1.mutationPushEvents, {
                events: events,
            });
        }
        catch (e) {
            console.error(e);
            return false;
        }
        return true;
    }
};
exports.ClinvaultService = ClinvaultService;
exports.ClinvaultService = ClinvaultService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [org_auth_service_1.OrgAuthService])
], ClinvaultService);
//# sourceMappingURL=clinvault.service.js.map
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrgAuthService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const config_1 = __importDefault(require("../../config"));
let OrgAuthService = class OrgAuthService {
    constructor(httpService) {
        this.httpService = httpService;
        this.scopes = config_1.default.okta.scopes;
        this.tokenResponse = null;
        this.tokenRespinseTime = 0;
    }
    async getAccessToken() {
        if (this.tokenResponse && this.isTokenValid()) {
            return this.tokenResponse.access_token;
        }
        return await this.requestNewToken();
    }
    isTokenValid() {
        if (!this.tokenResponse)
            return false;
        const bufferTime = 5 * 60 * 1000;
        const expirationTime = this.tokenRespinseTime + this.tokenResponse.expires_in * 1000 - bufferTime;
        return Date.now() < expirationTime;
    }
    async requestNewToken() {
        const basicAuthToken = Buffer.from(`${config_1.default.okta.clientId}:${config_1.default.okta.secret}`).toString('base64');
        const headers = {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${basicAuthToken}`,
        };
        const params = {
            grant_type: 'client_credentials',
            scope: this.scopes.join(','),
        };
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${config_1.default.okta.issuer}/v1/token`, null, {
                headers,
                params,
            }));
            this.tokenResponse = response.data;
            this.tokenRespinseTime = new Date().getTime();
            return this.tokenResponse.access_token;
        }
        catch (error) {
            console.error('Error obtaining Okta access token:', error);
            throw new Error('Failed to obtain Okta access token');
        }
    }
};
exports.OrgAuthService = OrgAuthService;
exports.OrgAuthService = OrgAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], OrgAuthService);
//# sourceMappingURL=org-auth.service.js.map
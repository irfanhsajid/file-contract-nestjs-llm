import { HttpService } from '@nestjs/axios';
export declare class OrgAuthService {
    private readonly httpService;
    protected scopes: string[];
    private tokenResponse;
    private tokenRespinseTime;
    constructor(httpService: HttpService);
    getAccessToken(): Promise<string>;
    private isTokenValid;
    private requestNewToken;
}

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import config from 'src/config';

interface OktaTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

@Injectable()
export class OrgAuthService {
  protected scopes = config.okta.scopes;

  private tokenResponse: OktaTokenResponse | null = null;
  private tokenRespinseTime = 0;

  constructor(private readonly httpService: HttpService) { }

  async getAccessToken(): Promise<string> {
    if (this.tokenResponse && this.isTokenValid()) {
      return this.tokenResponse.access_token;
    }
    return await this.requestNewToken();
  }

  private isTokenValid(): boolean {
    if (!this.tokenResponse) return false;
    const bufferTime = 5 * 60 * 1000;
    const expirationTime =
      this.tokenRespinseTime + this.tokenResponse.expires_in * 1000 - bufferTime;
    return Date.now() < expirationTime;
  }

  private async requestNewToken(): Promise<string> {
    const basicAuthToken = Buffer.from(`${config.okta.clientId}:${config.okta.secret}`).toString(
      'base64',
    );

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
      const response = await firstValueFrom<{ data: OktaTokenResponse }>(
        this.httpService.post<OktaTokenResponse>(`${config.okta.issuer}/v1/token`, null, {
          headers,
          params,
        }),
      );

      // Store the full token response
      this.tokenResponse = response.data;
      this.tokenRespinseTime = new Date().getTime();

      return this.tokenResponse.access_token;
    } catch (error) {
      console.error('Error obtaining Okta access token:', error);
      throw new Error('Failed to obtain Okta access token');
    }
  }
}

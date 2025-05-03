import { Module } from '@nestjs/common';
import { ClinvaultService } from './clinvault.service';
import { OrgAuthService } from './org-auth.service';
import { HttpModule } from '@nestjs/axios/dist/http.module';

@Module({
  imports: [
    HttpModule.register({
      timeout: 15000,
      maxRedirects: 2,
    }),
  ],
  providers: [ClinvaultService, OrgAuthService],
})
export class ClinvaultModule {}

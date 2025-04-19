import { Module } from '@nestjs/common';
import { FileContractService } from './file-contract.service';
import { FileContractResolver } from './file-contract.resolver';

@Module({
  providers: [FileContractResolver, FileContractService],
})
export class FileContractModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FileContractResolver } from './file-contract.resolver';
import { FileContractService } from './file-contract.service';
import { FileContractSchema, FileContractToken } from './file-contract.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: FileContractToken, schema: FileContractSchema }])],
  providers: [FileContractResolver, FileContractService],
})
export class FileContractModule {}

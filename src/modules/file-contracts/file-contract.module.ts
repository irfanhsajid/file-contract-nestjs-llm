import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FileContractResolver } from './file-contract.resolver';
import { FileContractService } from './file-contract.service';
import { EventTypeScalar } from './scalars/event-type.scalar';
import { CategoryScalar } from './scalars/category.scalar';
import {
  ExtractionResult,
  ExtractionResultSchema,
  FileContract,
  FileContractSchema,
} from './file-contract.schema';
import { ProductTypeScalar } from './scalars/product-type.scalar';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FileContract.name, schema: FileContractSchema },
      { name: ExtractionResult.name, schema: ExtractionResultSchema },
    ]),
  ],
  providers: [
    EventTypeScalar,
    CategoryScalar,
    ProductTypeScalar,
    FileContractResolver,
    FileContractService,
  ],
})
export class FileContractModule {}

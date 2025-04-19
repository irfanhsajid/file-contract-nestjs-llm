import { Test, TestingModule } from '@nestjs/testing';
import { FileContractResolver } from './file-contract.resolver';
import { FileContractService } from './file-contract.service';

describe('FileContractResolver', () => {
  let resolver: FileContractResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileContractResolver, FileContractService],
    }).compile();

    resolver = module.get<FileContractResolver>(FileContractResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

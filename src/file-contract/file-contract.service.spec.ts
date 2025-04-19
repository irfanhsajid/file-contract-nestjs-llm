import { Test, TestingModule } from '@nestjs/testing';
import { FileContractService } from './file-contract.service';

describe('FileContractService', () => {
  let service: FileContractService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileContractService],
    }).compile();

    service = module.get<FileContractService>(FileContractService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

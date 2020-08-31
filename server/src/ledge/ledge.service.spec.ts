import { Test, TestingModule } from '@nestjs/testing';
import { LedgeService } from './ledge.service';

describe('LedgeService', () => {
  let service: LedgeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LedgeService],
    }).compile();

    service = module.get<LedgeService>(LedgeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

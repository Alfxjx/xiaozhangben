import { Test, TestingModule } from '@nestjs/testing';
import { LedgeController } from './ledge.controller';

describe('LedgeController', () => {
  let controller: LedgeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LedgeController],
    }).compile();

    controller = module.get<LedgeController>(LedgeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

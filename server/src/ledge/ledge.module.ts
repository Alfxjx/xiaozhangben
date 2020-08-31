import { Module } from '@nestjs/common';
import { LedgeController } from './ledge.controller';
import { LedgeService } from './ledge.service';

@Module({
  controllers: [LedgeController],
  providers: [LedgeService]
})
export class LedgeModule {}

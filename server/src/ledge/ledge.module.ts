import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { LedgeController } from './ledge.controller';
import { LedgeService } from './ledge.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LedgeSchema } from "./schemas/ledge.schema";

@Module({
  imports:[MongooseModule.forFeature([{ name: 'Ledge', schema: LedgeSchema }])],
  controllers: [LedgeController],
  providers: [LedgeService]
})
export class LedgeModule {}

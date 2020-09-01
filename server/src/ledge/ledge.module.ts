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
import { AuthMiddleware } from "../shared/auth.middleware";
import { UserModule } from "../user/user.module";

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Ledge', schema: LedgeSchema }]), UserModule],
  controllers: [LedgeController],
  providers: [LedgeService]
})
export class LedgeModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*')
  }
}

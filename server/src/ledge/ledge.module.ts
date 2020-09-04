import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { LedgeController } from './ledge.controller';
import { LedgeService } from './ledge.service';
import { StatService } from "./stat.service";
import { MongooseModule } from '@nestjs/mongoose';
import { LedgeSchema } from "./schemas/ledge.schema";
import { UserStatSchema, GroupStatSchema } from "./schemas/stat.schema";
import { AuthMiddleware } from "../shared/auth.middleware";
import { UserModule } from "../user/user.module";
import { GroupModule } from "../group/group.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Ledge', schema: LedgeSchema },
      { name: 'UserStat', schema: UserStatSchema },
      { name: 'GroupStat', schema: GroupStatSchema }
    ]),
    forwardRef(() => UserModule),
    forwardRef(() => GroupModule)
  ],
  controllers: [LedgeController],
  providers: [LedgeService, StatService],
  exports: [StatService]
})

// export class LedgeModule implements NestModule {
//   public configure(consumer: MiddlewareConsumer) {
//     consumer.apply(AuthMiddleware).forRoutes('*')
//   }
// }

export class LedgeModule { }

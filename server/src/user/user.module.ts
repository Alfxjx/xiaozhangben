import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { AuthMiddleware } from '../shared/auth.middleware';
import { StatService } from "../ledge/stat.service";
import { LedgeModule } from "../ledge/ledge.module";
import { GroupModule } from "../group/group.module";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    forwardRef(() => LedgeModule),
    forwardRef(() => GroupModule)
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'user', method: RequestMethod.DELETE });
    // 在此加上的路由会调用中间件
  }
}

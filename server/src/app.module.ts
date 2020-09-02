import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { LedgeModule } from './ledge/ledge.module';
import { GroupModule } from './group/group.module';
import { PictureModule } from "./picture/picture.module";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/xzb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
    UserModule,
    LedgeModule,
    GroupModule,
    PictureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

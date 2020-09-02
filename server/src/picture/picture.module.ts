import { Module } from '@nestjs/common';
import { PictureController } from './picture.controller'
import { PictureService } from './picture.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PictureSchema } from './schemas/picture.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Picture', schema: PictureSchema }])],
  providers: [PictureService],
  controllers: [PictureController],
})
export class PictureModule { }

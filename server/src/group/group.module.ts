import { Module, forwardRef } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupSchema } from "./schemas/group.schema";
import { StatService } from "../ledge/stat.service";
import { LedgeModule } from "../ledge/ledge.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Group', schema: GroupSchema }]),
    forwardRef(() => LedgeModule),
    forwardRef(() => UserModule),
  ],
  controllers: [GroupController],
  providers: [GroupService]
})
export class GroupModule { }

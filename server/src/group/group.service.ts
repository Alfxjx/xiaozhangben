import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from "./interfaces/group.interface";
import { CreateGroupDTO } from './dto/create-group.dto';

@Injectable()
export class GroupService {
    constructor(@InjectModel('Group') private readonly groupModel: Model<Group>) { }
    private readonly logger = new Logger();

    async getGroupList() {
        return this.groupModel.find().exec()
    }

    async getGroupById(id) {
        return this.groupModel.find({ _id: id });
    }

    async createGroup(groupDTO: CreateGroupDTO) {
        const res = await this.groupModel(groupDTO)
        return res.save();
    }

}

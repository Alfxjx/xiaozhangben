import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Group, HandleUserType } from "./interfaces/group.interface";
import { CreateGroupDTO } from './dto/create-group.dto';
// import * as _ from 'lodash';

@Injectable()
export class GroupService {
    constructor(@InjectModel('Group') private readonly groupModel: Model<Group>) { }
    private readonly logger = new Logger();

    async getGroupList() {
        return this.groupModel.find().exec()
    }

    async getGroupById(id): Promise<CreateGroupDTO> {
        let list = await this.groupModel.findOne({ _id: id });
        return list;
    }

    async createGroup(groupDTO: CreateGroupDTO) {
        const res = await this.groupModel(groupDTO)
        return res.save();
    }

    async addUserToGroup(addBody: HandleUserType) {
        const group = await this.getGroupById(addBody.groupId);
        if (group.list.includes(addBody.userId)) {
            throw new HttpException('already in this group', HttpStatus.NOT_ACCEPTABLE)
        } else {
            await group.list.push(addBody.userId);
        }
        await this.logger.log(group)
        const addRes = await this.groupModel.findByIdAndUpdate(
            addBody.groupId, group, { new: true }
        );
        await this.logger.log(addRes)
        return addRes;
    }

    async removeUserFromGroup(rmBody: HandleUserType) {
        const group = await this.getGroupById(rmBody.groupId);

        let userList = [];
        for (let i = 0; i < group.list.length; i++) {
            this.logger.log(typeof group.list[i])
            if (group.list[i].toString() !== rmBody.userId) {
                userList.push(group.list[i])
            }
        }
        let input = { groupname: group.groupname, list: userList }
        this.logger.log(input)
        const rmRes = await this.groupModel.findByIdAndUpdate(
            rmBody.groupId,
            input,
            { new: true }
        );
        return rmRes
    }

    async deleteGroupById(id){
        let res = await this.groupModel.deleteOne({_id:id});
        return res;
    }

}

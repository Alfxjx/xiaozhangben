import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserStat, GroupStat } from "./interfaces/stat.interface";
import { CreateUserStat } from "./dto/create-stat.dto";
import { now } from 'lodash';

@Injectable()
export class StatService {
    constructor(
        @InjectModel('UserStat') private readonly userStatModel: Model<UserStat>,
        @InjectModel('GroupStat') private readonly groupStatModel: Model<GroupStat>
    ) { }

    /**
     *
     *
     * @author xu jianxiang
     * @date 2020-09-03
     * @param {string} userId
     * @return {*}  {Promise<UserStat[]>}
     * @memberof StatService
     */
    async getUserStatByUserId(userId: string): Promise<UserStat[]> {
        const res = await this.userStatModel.find({ _id: userId });
        return res;
    }

    async addUserStatAfterLedgeUpdateOrAdd(
        message: string, price: number, porn: string, userId: string
    ): Promise<CreateUserStat> {
        const nowStatusList = await this.getUserStatByUserId(userId);
        let nowStatus = nowStatusList[nowStatusList.length - 1].money;
        if (porn === 'income') {
            nowStatus += price;
        } else if (porn === 'expense') {
            nowStatus -= price
        }
        let updateRes = await this.userStatModel({
            message: message,
            money: nowStatus,
            userId: userId,
            date: new Date()
        });
        return updateRes.save();
    }

    async getGroupStat() { }

    async getGroupStatByGroupId() { }

    async addGroupStatAfterLedgeUpdateOrAdd() { }

    async updateGroupStateAfterUserJoinOrLeaveGroup() { }




}
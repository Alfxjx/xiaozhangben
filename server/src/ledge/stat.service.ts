import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserStat, GroupStat } from "./interfaces/stat.interface";
import { CreateUserStat, CreateGroupStat } from "./dto/create-stat.dto";


@Injectable()
export class StatService {
    constructor(
        @InjectModel('UserStat') private readonly userStatModel: Model<UserStat>,
        @InjectModel('GroupStat') private readonly groupStatModel: Model<GroupStat>
    ) { }

    /**
     *
     * @description 在创建用户的时候调用
     * @author xu jianxiang
     * @date 2020-09-04
     * @param {CreateUserStat} input
     * @return {*} 
     * @memberof StatService
     */
    async createUserStat(input: CreateUserStat) {
        const res = await this.userStatModel(input);
        return res.save();
    }

    /**
     *
     * @description 在创建群组的时候调用
     * @author xu jianxiang
     * @date 2020-09-04
     * @param {CreateGroupStat} input
     * @return {*} 
     * @memberof StatService
     */
    async createGroupStat(input: CreateGroupStat) {
        const res = await this.groupStatModel(input);
        return res.save();
    }

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
        const res = await this.userStatModel.find({ userId: userId });
        return res;
    }

    /**
     *
     *
     * @author xu jianxiang
     * @date 2020-09-04
     * @param {string} message
     * @param {number} price
     * @param {string} porn
     * @param {string} userId
     * @return {*}  {Promise<CreateUserStat>}
     * @memberof StatService
     */
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

    /**
     *
     *
     * @author xu jianxiang
     * @date 2020-09-04
     * @param {string} groupId
     * @return {*}  {Promise<[]>}
     * @memberof StatService
     */
    async getGroupStatByGroupId(groupId: string): Promise<GroupStat[]> {
        const res = await this.groupStatModel.find({ groupId: groupId });
        return res;
    }

    /**
     *
     *
     * @author xu jianxiang
     * @date 2020-09-04
     * @param {string} message
     * @param {number} price
     * @param {string} porn
     * @param {string} groupId
     * @return {*}  {Promise<CreateGroupStat>}
     * @memberof StatService
     */
    async addGroupStatAfterLedgeUpdateOrAdd(
        message: string, price: number, porn: string, groupId: string
    ): Promise<CreateGroupStat> {
        const nowStatusList = await this.getGroupStatByGroupId(groupId);
        let nowStatus = nowStatusList[nowStatusList.length - 1].money;
        if (porn === 'income') {
            nowStatus += price;
        } else if (porn === 'expense') {
            nowStatus -= price
        }
        let updateRes = await this.groupStatModel({
            message: message,
            money: nowStatus,
            groupId: groupId,
            date: new Date()
        });
        return updateRes.save();
    }

    /**
     *
     *
     * @author xu jianxiang
     * @date 2020-09-04
     * @param {string} groupId
     * @param {string} userId
     * @return {*}  {Promise<CreateGroupStat>}
     * @memberof StatService
     */
    async updateGroupStatAfterUserJoinOrLeaveGroup(
        groupId: string, userId: string, flag
    ): Promise<CreateGroupStat> {
        const group = await this.getGroupStatByGroupId(groupId);
        const user = await this.getUserStatByUserId(userId);
        const { money: Gmon } = group[group.length - 1];
        const { money: Umon } = user[user.length - 1];
        let newMoney = flag === 'join' ? Gmon + Umon : Gmon - Umon
        let updateRes = await this.groupStatModel({
            money: newMoney,
            date: new Date(),
            groupId: groupId,
            message: 'update group stat after user join or leave'
        });
        return updateRes.save();
    }




}
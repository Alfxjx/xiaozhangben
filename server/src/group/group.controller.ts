import { Controller, Logger, Get, Post, Delete, Put, HttpException, HttpStatus, Res, Body, Param, Query } from '@nestjs/common';
import { GroupService } from "./group.service";
import { Group, CreateGroupInput, HandleUserType } from './interfaces/group.interface';
import { ValidateObjectId } from "../shared/validate-object-id.pipes";
import { CreateGroupDTO } from './dto/create-group.dto';

@Controller('group')
export class GroupController {
    constructor(private readonly groupService: GroupService) { }
    private readonly logger = new Logger();

    @Get()
    async getGroupList(@Res() response) {
        const list = await this.groupService.getGroupList();
        if (!list) throw new HttpException('fail to get group list', HttpStatus.NOT_FOUND);
        return response.status(HttpStatus.OK).json({
            status: 1,
            message: 'get group list successfully!',
            data: list
        })
    }

    @Get(':id')
    async getGroupById(@Res() response, @Param() params) {
        const group = await this.groupService.getGroupById(params.id);
        if (!group) throw new HttpException('fail to get one group by id', HttpStatus.FORBIDDEN);
        return response.status(HttpStatus.OK).json({
            status: 1,
            message: 'get group successfully!',
            data: group
        })
    }

    @Post()
    async createGroup(@Res() response, @Body() group: CreateGroupInput) {
        let groupIn = {
            groupname: group.groupname,
            list: group.list.split(',')
        }
        // this.logger.log(groupIn)
        const res = await this.groupService.createGroup(groupIn);
        if (!res) throw new HttpException('create failed', HttpStatus.FORBIDDEN);
        return response.status(HttpStatus.OK).json({
            status: 1,
            message: 'create group successfully!',
            data: res
        })
    }

    @Post('add')
    async addUserToGroup(@Res() response, @Body() addBody: HandleUserType) {
        const addRes = await this.groupService.addUserToGroup(addBody);
        if (!addRes) throw new HttpException('add user failed', HttpStatus.FORBIDDEN);
        return response.status(HttpStatus.OK).json({
            status: 1,
            message: 'add user to group successfully!',
            data: addRes
        })
    }

    @Post('remove')
    async removeUserfromGroup(@Res() response, @Body() rmBody: HandleUserType) {
        const rmRes = await this.groupService.removeUserFromGroup(rmBody);
        if (!rmRes) throw new HttpException('rm user failed', HttpStatus.FORBIDDEN);
        return response.status(HttpStatus.OK).json({
            status: 1,
            message: 'remove user to group successfully!',
            data: rmRes
        })
    }

    @Delete()
    async deleteGroup(@Res() response, @Query('id', new ValidateObjectId()) id) {
        let delRes = await this.groupService.deleteGroupById(id);
        if (!delRes) throw new HttpException('fail to delete group', HttpStatus.FORBIDDEN);
        return response.status(HttpStatus.OK).json({
            status: 1,
            message: 'delete group successfully!',
            data: delRes
        })
    }
}

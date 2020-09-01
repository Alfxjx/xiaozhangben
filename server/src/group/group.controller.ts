import { Controller, Logger, Get, Post, Delete, Put, HttpException, HttpStatus, Res, Body } from '@nestjs/common';
import { GroupService } from "./group.service";
import { Group, CreateGroupInput } from './interfaces/group.interface';
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

    // TODO
    @Get(':id')
    async getGroupById() { }

    @Post()
    async createGroup(@Res() response, @Body() group: CreateGroupInput) {
        let groupIn = {
            name: group.name,
            list: group.list.split(',')
        }
        const res = await this.groupService.createGroup(groupIn);
        if (!res) throw new HttpException('create failed', HttpStatus.FORBIDDEN);
        return response.status(HttpStatus.OK).json({
            status: 1,
            message: 'create group successfully!',
            data: res
        })
    }

    @Post('add')
    async addUserToGroup() { }

    @Put('remove')
    async removeUserfromGroup() { }

    @Delete()
    async deleteGroup() { }
}

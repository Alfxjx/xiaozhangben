import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Res,
  Post,
  Body,
  Patch,
  Query,
  Param,
  Delete,
  Logger
} from '@nestjs/common';
import { LedgeService } from './ledge.service';
import { StatService } from "./stat.service";
import { CreateLedgeDTO } from './dto/create-ledge.dto';
import { LedgeInput } from "./interfaces/ledge.interface";
import { ValidateObjectId } from "../shared/validate-object-id.pipes";

@Controller('ledge')
export class LedgeController {
  constructor(
    private readonly ledgeService: LedgeService,
    private readonly staService: StatService
  ) { }

  private readonly logger = new Logger();

  @Get('list')
  async getLedgeList(@Res() res) {
    const list = await this.ledgeService.getLedgeList();
    if (!list) throw new HttpException('no responese', HttpStatus.FORBIDDEN);
    return res.status(HttpStatus.OK).json({
      status: 1,
      message: 'get Ledge List Ok',
      data: list,
    });
  }

  @Get('group/:id')
  async getLedgeByGroupId(@Res() response, @Param() param) {
    const data = await this.ledgeService.getLedgeById(param.id);
    if (!data) {
      throw new HttpException('fail to get group ledge', HttpStatus.FORBIDDEN);
    }
    if (data.length === 0) {
      throw new HttpException('no ledge for this group!', HttpStatus.NOT_FOUND)
    }
    return response.status(HttpStatus.OK).json({
      status: 1,
      message: 'group ledge get successfully!',
      data: data
    })
  }

  @Get('user/:id')
  async getLedgeByUserId(@Res() response, @Param() param) {
    const data = await this.ledgeService.getLedgeByUserId(param.id);
    if (!data) {
      throw new HttpException('fail to get group ledge', HttpStatus.FORBIDDEN);
    }
    if (data.length === 0) {
      throw new HttpException('no ledge for this group!', HttpStatus.NOT_FOUND)
    }
    return response.status(HttpStatus.OK).json({
      status: 1,
      message: 'user ledge get successfully!',
      data: data
    })
  }

  @Get(':id')
  async getLedgeById(@Res() response, @Param() param) {
    const data = await this.ledgeService.getLedgeById(param.id);
    if (!data) {
      throw new HttpException('fail to get one ledge', HttpStatus.FORBIDDEN);
    }
    if (data.length === 0) {
      throw new HttpException('no this ledge!', HttpStatus.NOT_FOUND)
    }
    return response.status(HttpStatus.OK).json({
      status: 1,
      message: 'one ledge get successfully!',
      data: data
    })
  }

  @Post()
  async createNewLedge(@Res() res, @Body() req: LedgeInput) {
    let newLedge = await this.ledgeService.createLedge(req);
    let { price, porn, userId } = req;
    let groupStatRes;
    if (req.hasOwnProperty('groupId')) {
      let groupId = req.groupId;
      groupStatRes = await this.staService.addGroupStatAfterLedgeUpdateOrAdd('add new ledge', price, porn, groupId);
    }
    let userStatRes = await this.staService.addUserStatAfterLedgeUpdateOrAdd('add new ledge', price, porn, userId);
    if (!newLedge) {
      throw new HttpException(
        'error: cannot create new ledge',
        HttpStatus.FORBIDDEN,
      );
    }
    return res.status(HttpStatus.OK).json({
      status: 1,
      message: 'create new ledge successfully!',
      data: newLedge,
      stat: {
        user: userStatRes,
        group: groupStatRes
      }
    });
  }

  // TODO 需要测试： 修改债务的时候的时候不会触发统计的接口
  @Patch()
  async patchLedge(
    @Res() response,
    @Query('id', new ValidateObjectId()) id,
    @Body() ledgeInput: LedgeInput
  ) {
    let ledgeById = await this.ledgeService.getLedgeById(id);
    let oldMon = ledgeById.price;
    let oldPorn = ledgeById.porn;
    let newMoney = ledgeInput.price;
    let newPorn = ledgeInput.porn;
    if (oldPorn === 'income') {
      oldMon = oldMon;
    } else if (oldPorn === 'expense') {
      oldMon = oldMon * (-1)
    }
    if (newPorn === 'income') {
      newMoney = newMoney;
    } else if (newPorn === 'expense') {
      newMoney = newMoney * (-1)
    }
    let deltaMon = newMoney - oldMon;
    let statPorn = '';
    let statMoney = 0;
    if (deltaMon < 0) {
      statMoney = Math.abs(deltaMon);
      statPorn = 'expense'
    } else {
      statMoney = deltaMon;
      statPorn = 'income'
    }
    let patchRes = await this.ledgeService.patchLedge(id, ledgeInput);
    if (!patchRes) {
      throw new HttpException('fail to patch', HttpStatus.FORBIDDEN);
    }
    let groupStatRes;
    if (ledgeInput.hasOwnProperty('groupId')) {
      let groupId = ledgeInput.groupId;
      groupStatRes = await this.staService.addGroupStatAfterLedgeUpdateOrAdd('ledge patched', statMoney, statPorn, groupId);
    }
    let userId = ledgeInput.userId;
    let userStatRes = await this.staService.addUserStatAfterLedgeUpdateOrAdd('ledge patched', statMoney, statPorn, userId);
    return response.status(HttpStatus.OK).json({
      status: 1,
      message: 'patch ledge successfully!',
      data: patchRes,
      stat: {
        user: userStatRes,
        group: groupStatRes

      }
    })
  }

  @Delete()
  async deleteLedge(@Res() response, @Query('id', new ValidateObjectId()) id) {
    // TODO 删除一个记录之后需要更新stat
    const data = await this.ledgeService.deleteLedge(id);
    if (!data) {
      throw new HttpException(`fail to delete ${id}`, HttpStatus.FORBIDDEN);
    }
    return response.status(HttpStatus.OK).json({
      status: 1,
      message: 'delete successfully!',
      data: data
    })
  }

  @Get('stat/group')
  async getStatByGroupId(@Res() resp, @Query('id') id) {
    const res = await this.staService.getGroupStatByGroupId(id);
    return resp.status(HttpStatus.OK).json({
      status: 1,
      message: 'get stat of a group by group id',
      data: res
    });
  }

  @Get('stat/user')
  async getStatByUserId(@Res() resp, @Query('id') id) {
    const res = await this.staService.getUserStatByUserId(id);
    return resp.status(HttpStatus.OK).json({
      status: 1,
      message: 'get stats for one user by userId',
      data: res
    });
  }
}

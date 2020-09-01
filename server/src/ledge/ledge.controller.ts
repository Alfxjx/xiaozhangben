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
import { CreateLedgeDTO } from './dto/create-ledge.dto';
import { LedgeInput } from "./interfaces/ledge.interface";
import { response } from 'express';
import { ValidateObjectId } from "../shared/validate-object-id.pipes";

@Controller('ledge')
export class LedgeController {
  constructor(private readonly ledgeService: LedgeService) { }

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
  async getLedgeByGroupId(@Res() response, @Param() param){
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
  async getLedgeByUserId(@Res() response, @Param() param){
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
    });
  }

  @Patch()
  async patchLedge(@Res() response, @Query('id', new ValidateObjectId()) id, @Body() ledgeInput: LedgeInput) {
    let patchRes = await this.ledgeService.patchLedge(id, ledgeInput);
    if (!patchRes) {
      throw new HttpException('fail to patch', HttpStatus.FORBIDDEN);
    }
    return response.status(HttpStatus.OK).json({
      status: 1,
      message: 'patch ledge successfully!',
      data: patchRes
    })
  }

  @Delete()
  async deleteLedge(@Res() response, @Query('id', new ValidateObjectId()) id) {
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
}

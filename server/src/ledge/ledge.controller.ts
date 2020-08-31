import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Res,
  Post,
  Body,
} from '@nestjs/common';
import { LedgeService } from './ledge.service';
import { CreateLedgeDTO } from './dto/create-ledge.dto';

@Controller('ledge')
export class LedgeController {
  constructor(private readonly ledgeService: LedgeService) {}

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

  @Post()
  async createNewLedge(@Res() res, @Body() req: CreateLedgeDTO) {
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
}

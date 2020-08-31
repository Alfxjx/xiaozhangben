import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateLedgeDTO } from './dto/create-ledge.dto';
import { Ledge } from './interfaces/ledge.interface';
@Injectable()
export class LedgeService {
  constructor(
    @InjectModel('Ledge') private readonly ledgeModel: Model<Ledge>,
  ) {}

  async getLedgeList() {
    return this.ledgeModel.find().exec();
  }

  async createLedge(ledgeDTO) {
    let list = ledgeDTO.tag.split(',');
    const newLedge = await this.ledgeModel({
      tag:list,
      price:ledgeDTO.price,
      porn:ledgeDTO.porn,
      description:ledgeDTO.description,
      category: ledgeDTO.category,
      star: ledgeDTO.star,
      userId: ledgeDTO.userId
    });
    return newLedge.save();
  }

  async patchLedge() {}

  async deleteLedge() {}
}

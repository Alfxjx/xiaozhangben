import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateLedgeDTO } from './dto/create-ledge.dto';
import { Ledge, LedgeInput } from './interfaces/ledge.interface';
@Injectable()
export class LedgeService {
  constructor(
    @InjectModel('Ledge') private readonly ledgeModel: Model<Ledge>,
  ) { }

  private readonly logger = new Logger();

  async getLedgeList() {
    return this.ledgeModel.find().exec();
  }

  async getLedgeByGroupId(id){
    return this.ledgeModel.find({ groupId: id })
  }

  async getLedgeByUserId(id){
    return this.ledgeModel.find({ userId: id })
  }

  async getLedgeById(id) {
    return this.ledgeModel.find({ _id: id })
  }

  async createLedge(ledgeDTO: LedgeInput) {
    let list;
    if (typeof ledgeDTO.tag === "string") {
      list = ledgeDTO.tag.split(',');
    } else if (Array.isArray(ledgeDTO.tag)) {
      list = ledgeDTO.tag
    }
    let inputData: CreateLedgeDTO = {
      tag: list,
      price: ledgeDTO.price,
      porn: ledgeDTO.porn,
      description: ledgeDTO.description,
      category: ledgeDTO.category,
      star: ledgeDTO.star,
      userId: ledgeDTO.userId,
      groupId: ledgeDTO.groupId
    };
    const newLedge = await this.ledgeModel(inputData);
    return newLedge.save();
  }

  async patchLedge(id, ledgeDTO: LedgeInput) {
    // 对输入的tag进行修改
    let inputData;
    if (ledgeDTO.hasOwnProperty('tag')) {
      let { tag, ...rest } = ledgeDTO;
      inputData = { tag: tag.split(','), ...rest }
    } else {
      inputData = ledgeDTO;
    }
    let data = await this.getLedgeById(id);
    this.logger.log(data)
    await Object.assign(data, inputData);
    const patchRes = await this.ledgeModel.findByIdAndUpdate(
      id,
      inputData,
      { new: true }
    );
    return patchRes
  }

  async deleteLedge(id) {
    const response = await this.ledgeModel.deleteOne({ _id: id });
    return response;
  }

}

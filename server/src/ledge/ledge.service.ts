import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateLedgeDTO } from "./dto/create-ledge.dto";
import { Ledge } from "./interfaces/ledge.interface";
@Injectable()
export class LedgeService {
    constructor(@InjectModel('Ledge') private readonly ledgeModel:Model<Ledge>){}

    async getLedgeList(){}

    async createLedge(){}

    async patchLedge(){}

    async deleteLedge(){}
}

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePictureDTO } from "./dto/create-picture.dto";
import { Picture } from "./interface/picture.interface";

@Injectable()
export class PictureService {
    constructor(@InjectModel('Picture') private readonly pictureModel: Model<Picture>) { }

    async addPicture(picturDTO: CreatePictureDTO): Promise<Picture> {
        const newPic = await this.pictureModel(picturDTO);
        return newPic.save()
    }

    async findAll() {
        const list = await this.pictureModel.find();
        return list
    }
}

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserRO } from './interfaces/user.interface';
import { CreateUserDTO, LoginUserDTO } from './dto/create-user.dto';
import * as jwt from 'jsonwebtoken';
import { SECRET } from '../config';
// import * as argon2 from 'argon2';


@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

  async register(newUserDTO: CreateUserDTO): Promise<User> {
    //  check if exist
    let isExist = await this.userModel.findOne({ username: newUserDTO.username });
    if (isExist !== null) {
      throw new HttpException({ message: 'Input data validation failed, already registered' }, HttpStatus.BAD_REQUEST);
    }
    const newUser = await this.userModel(newUserDTO);
    return newUser.save();
  }

  async login(login: LoginUserDTO) {
    let user;
    if (login.mail) {
      user = await this.userModel.findOne({ mail: login.mail });
    } else if (login.username) {
      user = await this.userModel.findOne({ username: login.username });
    } else {
      throw new HttpException({ message: 'Input data validation failed, login' }, HttpStatus.BAD_REQUEST)
    }
    // if (!user) {
    //   return null;
    // }
    // TODO argon2 加密一波 需要在注册的时候就加密
    if (!login.password) {
      throw new HttpException({ message: 'no password input' }, HttpStatus.BAD_REQUEST)
    } else if (user.password == login.password) {
      return user;
    } else {
      throw new HttpException({message:'wrong password'}, HttpStatus.UNAUTHORIZED)
    }

    // return null;
  }

  async getUserList() {
    const list = await this.userModel.find().exec();
    return list;
  }

  async findByName(name: string): Promise<UserRO> {
    let res = await this.userModel.findOne({ username: name });
    return this.buildUserRO(res);
  }

  async findById(id: string): Promise<UserRO> {
    let res = await this.userModel.findOne({ _id: id });
    return this.buildUserRO(res);
  }

  async delete(id){
    let res =  await this.userModel.findByIdAndRemove(id);
    return res;
  }

  public generateJWT(user) {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
      username: user.username,
      email: user.mail,
      exp: exp.getTime() / 1000,
    }, SECRET);
  };

  private buildUserRO(user): UserRO {
    const userRO = {
      username: user.username,
      mail: user.mail,
      token: this.generateJWT(user),
    };

    return userRO;
  }


}

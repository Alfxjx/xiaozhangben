import { Controller, Post, Res, Body, HttpStatus, Get, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, LoginUserDTO } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  async getUserList(@Res() res) {
    const list = await this.userService.getUserList();
    return res.status(HttpStatus.OK).json({
      list,
    });
  }

  @Post('register')
  async register(@Res() res, @Body() CreateUserDTO: CreateUserDTO) {
    const newUser = await this.userService.register(CreateUserDTO);
    return res.status(HttpStatus.OK).json({
      status: 1,
      message: 'User has been submitted successfully!',
      post: newUser,
    });
  }

  @Post('login')
  async login(@Res() res, @Body() loginDTO: LoginUserDTO) {
    const loginRes = await this.userService.login(loginDTO);
    const token = await this.userService.generateJWT(loginRes);
    const { username, mail } = loginRes;
    return res.status(HttpStatus.OK).json({
      status: 1,
      message: 'User login successfully!',
      post: { username, mail, token },
    });
  }

  @Delete()
  async delete(@Query() params) {
    return await this.userService.delete(params.id);
  }
}


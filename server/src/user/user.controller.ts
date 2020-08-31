import { Controller, Post, Res, Body, HttpStatus, Get, Delete, Query, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, LoginUserDTO } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    async getUserList(@Res() res) {
        const list = await this.userService.getUserList();
        return res.status(HttpStatus.OK).json({
            status: 1,
            message: 'get User list ok',
            data: list
        });
    }

    @Get()
    async getUserById(@Res() res, @Query('id') query) {
        const userById = await this.userService.findById(query.id)
        if (!userById) throw new HttpException('fail to find ' + query.id, HttpStatus.BAD_REQUEST);
        return res.status(HttpStatus.OK).json({
            status: 1,
            message: 'User has been get successfully!',
            data: userById,
        });
    }

    @Post('register')
    async register(@Res() res, @Body() CreateUserDTO: CreateUserDTO) {
        const newUser = await this.userService.register(CreateUserDTO);
        return res.status(HttpStatus.OK).json({
            status: 1,
            message: 'User has been submitted successfully!',
            data: newUser,
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
            data: { username, mail, token },
        });
    }

    @Delete()
    async delete(@Res() respsonse, @Query() params) {
        const deleteRes = await this.userService.delete(params.id);
        if (!deleteRes) throw new HttpException('fail to delete ' + params.id, HttpStatus.BAD_REQUEST)
        return respsonse.status(HttpStatus.OK).json({
            status: 1,
            message: 'delete user successfully!',
            data: deleteRes
        })
    }
}


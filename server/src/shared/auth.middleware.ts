import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NestMiddleware, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { SECRET } from '../config';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) { }

  private readonly logger = new Logger(AuthMiddleware.name);

  async use(req: any, res: Response, next: NextFunction) {
    // @note 这里的authorization对大小写不敏感
    const authHeaders = req.headers.authorization;
    this.logger.log(`authHeaders: ${authHeaders}`);
    if (authHeaders) {
      const token = authHeaders;
      const decoded: any = jwt.verify(token, SECRET);
      const user = await this.userService.findByName(decoded.username);

      if (!user) {
        throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
      }

      req.username = user.username;
      next();

    } else {
      throw new HttpException('Not authorized. need JWT', HttpStatus.UNAUTHORIZED);
    }
  }
}

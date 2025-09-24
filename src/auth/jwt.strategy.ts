// jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { UserInfo } from '../models/userInfo.model';
import { AuthService } from './auth.service';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return request?.cookies?.jwt; // Extract from 'jwt' cookie
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_TOKEN_KEY!,
    });
  }

  async validate(payload: UserInfo) {
    const user = await this.authService.getCurrentUser(payload.id);

    if (!user)
      throw new UnauthorizedException(
        StatusCodes.UNAUTHORIZED,
        'Access denied',
      );

    return user;
  }
}

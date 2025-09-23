import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserInfo } from 'src/models/userInfo.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_TOKEN_KEY,
    });
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async validate(payload: UserInfo) {
    return {
      id: payload.id,
      name: payload.name,
      role: payload.role,
    };
  }
}

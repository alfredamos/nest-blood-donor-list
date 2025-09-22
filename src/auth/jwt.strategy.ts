import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserInfo } from 'src/models/userInfo.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      secretOrKey: config.get('JWT_SECRET_KEY'),
    });
  }

  validate(payload: UserInfo) {
    return {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      role: payload.role,
    };
  }
}

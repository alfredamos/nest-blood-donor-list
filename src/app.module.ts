/* eslint-disable prettier/prettier */
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { VitalModule } from './vital/vital.module';
import { DonorDetailModule } from './donor-detail/donor-detail.module';
import { BloodStatModule } from './blood-stat/blood-stat.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    VitalModule,
    DonorDetailModule,
    BloodStatModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude(
{path: 'auth/login', method: RequestMethod.POST }, // Example public login route
      { path: 'auth/signup', method: RequestMethod.POST }, // Example public registration route
      { path: 'auth/refresh', method: RequestMethod.POST }, // Example public registration route
      'public-route/(.*)', // Example for a wildcard path
    ).forRoutes('*'); // Apply to all routes
  }
}
/* eslint-disable prettier/prettier */
import {  Module} from '@nestjs/common';
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
//import { AuthMiddleware } from './auth/auth.middleware';

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
export class AppModule{
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(AuthMiddleware).forRoutes('*'); // Apply to all routes
  // }
}

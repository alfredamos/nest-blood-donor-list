import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { VitalModule } from './vital/vital.module';
import { DonorDetailModule } from './donor-detail/donor-detail.module';
import { BloodStatModule } from './blood-stat/blood-stat.module';

@Module({
  imports: [PrismaModule, UserModule, VitalModule, DonorDetailModule, BloodStatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

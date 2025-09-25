import { Module } from '@nestjs/common';
import { BloodStatService } from './blood-stat.service';
import { BloodStatController } from './blood-stat.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [BloodStatController],
  providers: [BloodStatService, PrismaService],
})
export class BloodStatModule {}

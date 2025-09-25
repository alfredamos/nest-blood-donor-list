import { Module } from '@nestjs/common';
import { VitalService } from './vital.service';
import { VitalController } from './vital.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [VitalController],
  providers: [VitalService, PrismaService],
})
export class VitalModule {}

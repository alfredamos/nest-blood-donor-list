import { Module } from '@nestjs/common';
import { DonorDetailService } from './donor-detail.service';
import { DonorDetailController } from './donor-detail.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [DonorDetailController],
  providers: [DonorDetailService, PrismaService],
})
export class DonorDetailModule {}

import { Module } from '@nestjs/common';
import { DonorDetailService } from './donor-detail.service';
import { DonorDetailController } from './donor-detail.controller';

@Module({
  controllers: [DonorDetailController],
  providers: [DonorDetailService],
})
export class DonorDetailModule {}

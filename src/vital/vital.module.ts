import { Module } from '@nestjs/common';
import { VitalService } from './vital.service';
import { VitalController } from './vital.controller';

@Module({
  controllers: [VitalController],
  providers: [VitalService],
})
export class VitalModule {}

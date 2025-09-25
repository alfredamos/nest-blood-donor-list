import { PartialType } from '@nestjs/mapped-types';
import { CreateVitalDto } from './create-vital.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateVitalDto extends PartialType(CreateVitalDto) {
  @IsNotEmpty()
  @IsString()
  id: string;
}

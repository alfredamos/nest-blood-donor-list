import { PartialType } from '@nestjs/mapped-types';
import { CreateDonorDetailDto } from './create-donor-detail.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDonorDetailDto extends PartialType(CreateDonorDetailDto) {
  @IsNotEmpty()
  @IsString()
  id: string;
}

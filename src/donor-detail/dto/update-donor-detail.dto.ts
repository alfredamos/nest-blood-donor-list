import { PartialType } from '@nestjs/mapped-types';
import { CreateDonorDetailDto } from './create-donor-detail.dto';

export class UpdateDonorDetailDto extends PartialType(CreateDonorDetailDto) {}

import { IsEnum, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { DonorType } from '@prisma/client';

export class CreateDonorDetailDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  volumerPerDonation: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  numberOfDonations: number;

  @IsNotEmpty()
  @IsEnum(DonorType)
  type: DonorType;
}

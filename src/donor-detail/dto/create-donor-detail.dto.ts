import { IsEnum, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { DonorType } from '@prisma/client';

export class CreateDonorDetailDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  volumePerDonation: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  numberOfDonations: number;

  @IsNotEmpty()
  @IsEnum(DonorType)
  type: DonorType;

  userId: string;
}

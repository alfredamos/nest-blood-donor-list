import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBloodStatDto {
  @IsNotEmpty()
  @IsString()
  genoType: string;

  @IsNotEmpty()
  @IsString()
  bloodGroup: string;

  userId: string;
}

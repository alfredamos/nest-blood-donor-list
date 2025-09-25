import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateVitalDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  pressureUp: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  pressureLow: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  temperature: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  height: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  weight: number;

  bmi: number;

  userId: string;
}

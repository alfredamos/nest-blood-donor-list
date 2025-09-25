import { PartialType } from '@nestjs/mapped-types';
import { CreateBloodStatDto } from './create-blood-stat.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBloodStatDto extends PartialType(CreateBloodStatDto) {
  @IsNotEmpty()
  @IsString()
  id: string;
}

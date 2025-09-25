import { CreateVitalDto } from './create-vital.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateVitalDto extends CreateVitalDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}

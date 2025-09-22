import { Gender } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EditProfileDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  gender: Gender;

  @IsNotEmpty()
  @IsString()
  dateOfBirth: Date;
}

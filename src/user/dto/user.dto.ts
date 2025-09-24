import { Gender, Role } from '@prisma/client';

export class UserDto {
  id: string;
  address: string;
  name: string;
  email: string;
  image: string;
  phone: string;
  gender: Gender;
  age: number;
  role: Role;
}

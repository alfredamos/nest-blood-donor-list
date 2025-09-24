import { User } from '@prisma/client';
import { UserDto } from '../user/dto/user.dto';

export function toUserDto(
  user: User,
): UserDto {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    gender: user.gender,
    image: user.image,
    age: user.age,
    address: user.address,
    role: user.role,
  };
}

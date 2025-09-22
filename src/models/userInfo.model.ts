import { Role } from '@prisma/client';

export class UserInfo {
  id: string;
  name: string;
  email: string;
  role: Role;
}

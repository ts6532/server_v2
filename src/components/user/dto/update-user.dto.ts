import { UserRole } from '@components/user/dto/user-roles.dto';

export class UpdateUserDto {
  _id: string;

  email?: string;

  role?: UserRole;

  firstname?: string;
}

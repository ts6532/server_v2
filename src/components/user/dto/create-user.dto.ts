import { UserRole } from '@components/user/dto/user-roles.dto';

export class CreateUserDto {
  email: string;

  password: string;

  role: UserRole;

  firstname?: string;
}

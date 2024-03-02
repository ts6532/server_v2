import { User } from '@components/user/user.schema';
import { OmitType, PartialType } from '@nestjs/swagger';

export class UserDto extends OmitType(User, ['password']) {}

export class CreateUserDto extends OmitType(User, ['id']) {}

export class UpdateUserInfoDto extends PartialType(User) {
  id: string;
}

export class UpdateUserPasswordDto {
  passwords: string;
}

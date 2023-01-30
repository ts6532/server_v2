import { UserDto } from './user.dto';

export class UserWithIdDto extends UserDto {
  _id: string;
  constructor() {
    super();
  }
}

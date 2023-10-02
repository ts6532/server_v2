import { User } from '../schemas/user.schema';

export class UserDto {
  _id: string;

  email: string;

  role: string;

  firstname?: string;

  constructor(user?: User) {
    if (user) {
      this._id = user._id?.toString();
      this.email = user.email;
      this.role = user.role;
      if (user.firstname) this.firstname = user.firstname;
    }
  }
}

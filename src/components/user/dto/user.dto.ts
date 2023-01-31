import { User } from '../schemas/user.schema';

export class UserDto {
  _id: string;

  email: string;

  role: string;

  isActivated: boolean;

  firstname?: string;

  constructor(user?: User) {
    if (user) {
      this._id = user._id.toString();
      this.email = user.email;
      this.role = user.role;
      this.isActivated = user.isActivated;
      if (user.firstname) this.firstname = user.firstname;
    }
  }
}

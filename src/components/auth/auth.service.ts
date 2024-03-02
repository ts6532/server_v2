import { UserDto } from '@components/user/user.dto';
import { UserService } from '@components/user/user.service';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(emailToValidate: string, pass: string): Promise<UserDto> {
    const user = await this.userService.getUser({ email: emailToValidate });

    if (!user) throw new NotFoundException();

    const passwordValid = await bcrypt.compare(pass, user.password);

    if (!passwordValid) throw new UnauthorizedException();

    user.toObject();

    const { email, role, id } = user;
    return { id, email, role };
  }
}

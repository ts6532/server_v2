import { UserService } from '@components/user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AppErrors } from '@src/common/constants/app-errors';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.getUser({ email });

    if (!user) return new BadRequestException(AppErrors.USER_NOT_EXIST);

    const passwordValid = await bcrypt.compare(pass, user.password);

    if (!passwordValid)
      return new BadRequestException(AppErrors.WRONG_PASSWORD);
    delete user.password;
    return user;
  }
}

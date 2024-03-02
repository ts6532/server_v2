import { UserDto } from '@components/user/user.dto';
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: UserDto, done: CallableFunction) {
    done(null, user);
  }

  deserializeUser(payload: UserDto, done: CallableFunction) {
    done(null, payload);
  }
}

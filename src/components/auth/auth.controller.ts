import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Session,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginData } from './dto/login-data.dto';
@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() data: LoginData,
    @Session() session: Record<string, any>,
    @Req() req: any,
  ) {
    const isValid = await this.authService.validateUser(
      data.email,
      data.password,
    );

    if (isValid) {
      session.isAuth = true;
      session.user = data.email;
      session._id = req.sessionID;
      return { message: 'Пользователь успешно авторизован', user: data.email };
    }

    throw new HttpException(
      'Пользователь не найден. Почта и/или пароль не верны',
      HttpStatus.NOT_FOUND,
    );
  }

  @Get('/me')
  async checkMe(@Req() req) {
    if (req.session.isAuth) {
      return { isAuth: req.session.isAuth, user: req.session.user };
    }

    throw new HttpException(
      { message: 'Вы не авторизованы', isAuth: false },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

import { LoginDataDto } from '@components/auth/dto/login-data.dto';
import { LocalAuthGuard } from '@components/auth/local.auth.guard';
import { UserDto } from '@components/user/user.dto';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
// @UseInterceptors(MongooseClassSerializerInterceptor(User))
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: [LoginDataDto] })
  @ApiResponse({ type: [UserDto] })
  async login(@Request() req) {
    return req.user;
  }
}

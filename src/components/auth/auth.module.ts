import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SessionSerializer } from './session.serializer';
import { UserModule } from '@components/user/user.module';
import { LocalStrategy } from '@components/auth/local.strategy';
import { AuthController } from '@components/auth/auth.controller';

@Module({
  imports: [UserModule, PassportModule.register({ session: true })],
  providers: [AuthService, SessionSerializer, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

import { IsEmail, IsString } from 'class-validator';

export class LoginDataDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

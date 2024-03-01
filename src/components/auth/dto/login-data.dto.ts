import { IsEmail } from 'class-validator';

export class LoginDataDto {
  @IsEmail()
  email: string;

  password: string;
}

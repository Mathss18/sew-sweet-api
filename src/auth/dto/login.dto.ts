import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(191)
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

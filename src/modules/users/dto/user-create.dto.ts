import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRoleEnum } from '../entity';

export class UserCreateDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;
}

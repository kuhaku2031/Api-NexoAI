import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  password: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  confirm_password: string;
}

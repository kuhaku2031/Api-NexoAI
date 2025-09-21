import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginAuthDto {
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(150)
  @IsNotEmpty()
  password: string;
}
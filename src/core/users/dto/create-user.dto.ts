import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';
import { UserRole } from 'src/common/enum/role.enum';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @MinLength(3)
  @MaxLength(150)
  @IsNotEmpty()
  company_id: string;

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

  @IsString()
  @MinLength(3)
  @MaxLength(150)
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(150)
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @MinLength(7)
  @MaxLength(20)
  @IsOptional()
  phone_number?: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

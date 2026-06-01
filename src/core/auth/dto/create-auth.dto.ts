import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  @IsNotEmpty()
  owner_name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(150)
  @IsNotEmpty()
  owner_lastname: string;

  @IsString()
  @MinLength(3)
  @MaxLength(150)
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(150)
  @IsNotEmpty()
  password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(150)
  @IsNotEmpty()
  confirm_password: string;

  @IsString()
  @MinLength(3)
  @MaxLength(150)
  @IsNotEmpty()
  company_name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(150)
  @IsNotEmpty()
  business_type: string;

  @IsString()
  @MinLength(7)
  @MaxLength(20)
  @IsNotEmpty()
  @Matches(/^[+\d][\d\s-]+$/, {
    message: 'Invalid phone number format',
  })
  phone_number: string;

  @IsString()
  @MinLength(3)
  @MaxLength(150)
  @IsNotEmpty()
  address: string;

  @IsString()
  @MinLength(3)
  @MaxLength(150)
  @IsNotEmpty()
  city: string;

  @IsString()
  @MinLength(3)
  @MaxLength(150)
  @IsNotEmpty()
  country: string;
}

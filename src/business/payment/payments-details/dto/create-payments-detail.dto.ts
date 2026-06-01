import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreatePaymentsDetailDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  payment_method_id: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(9999999999.99)
  @IsNotEmpty()
  total_amount: number;
}

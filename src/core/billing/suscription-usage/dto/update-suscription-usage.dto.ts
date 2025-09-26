import { PartialType } from '@nestjs/mapped-types';
import { CreateSuscriptionUsageDto } from './create-suscription-usage.dto';

export class UpdateSuscriptionUsageDto extends PartialType(CreateSuscriptionUsageDto) {}

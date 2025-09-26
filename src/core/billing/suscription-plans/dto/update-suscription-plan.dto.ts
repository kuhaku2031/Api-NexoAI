import { PartialType } from '@nestjs/mapped-types';
import { CreateSuscriptionPlanDto } from './create-suscription-plan.dto';

export class UpdateSuscriptionPlanDto extends PartialType(CreateSuscriptionPlanDto) {}

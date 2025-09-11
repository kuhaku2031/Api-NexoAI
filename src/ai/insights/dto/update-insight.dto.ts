import { PartialType } from '@nestjs/mapped-types';
import { CreateInsightDto } from './create-insight.dto';

export class UpdateInsightDto extends PartialType(CreateInsightDto) {}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuscriptionPlansService } from './suscription-plans.service';
import { CreateSuscriptionPlanDto } from './dto/create-suscription-plan.dto';
import { UpdateSuscriptionPlanDto } from './dto/update-suscription-plan.dto';

@Controller('suscription-plans')
export class SuscriptionPlansController {
  constructor(private readonly suscriptionPlansService: SuscriptionPlansService) {}

  @Post()
  create(@Body() createSuscriptionPlanDto: CreateSuscriptionPlanDto) {
    return this.suscriptionPlansService.create(createSuscriptionPlanDto);
  }

  @Get()
  findAll() {
    return this.suscriptionPlansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suscriptionPlansService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSuscriptionPlanDto: UpdateSuscriptionPlanDto) {
    return this.suscriptionPlansService.update(+id, updateSuscriptionPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suscriptionPlansService.remove(+id);
  }
}

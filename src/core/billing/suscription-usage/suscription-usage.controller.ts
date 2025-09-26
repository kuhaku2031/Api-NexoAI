import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuscriptionUsageService } from './suscription-usage.service';
import { CreateSuscriptionUsageDto } from './dto/create-suscription-usage.dto';
import { UpdateSuscriptionUsageDto } from './dto/update-suscription-usage.dto';

@Controller('suscription-usage')
export class SuscriptionUsageController {
  constructor(private readonly suscriptionUsageService: SuscriptionUsageService) {}

  @Post()
  create(@Body() createSuscriptionUsageDto: CreateSuscriptionUsageDto) {
    return this.suscriptionUsageService.create(createSuscriptionUsageDto);
  }

  @Get()
  findAll() {
    return this.suscriptionUsageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suscriptionUsageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSuscriptionUsageDto: UpdateSuscriptionUsageDto) {
    return this.suscriptionUsageService.update(+id, updateSuscriptionUsageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suscriptionUsageService.remove(+id);
  }
}

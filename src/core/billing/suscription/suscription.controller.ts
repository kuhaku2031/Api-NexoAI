import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuscriptionService } from './suscription.service';
import { CreateSuscriptionDto } from './dto/create-suscription.dto';
import { UpdateSuscriptionDto } from './dto/update-suscription.dto';

@Controller('suscription')
export class SuscriptionController {
  constructor(private readonly suscriptionService: SuscriptionService) {}

  @Post()
  create(@Body() createSuscriptionDto: CreateSuscriptionDto) {
    return this.suscriptionService.create(createSuscriptionDto);
  }

  @Get()
  findAll() {
    return this.suscriptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suscriptionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSuscriptionDto: UpdateSuscriptionDto) {
    return this.suscriptionService.update(+id, updateSuscriptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suscriptionService.remove(+id);
  }
}

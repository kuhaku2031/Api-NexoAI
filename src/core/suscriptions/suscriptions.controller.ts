import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuscriptionsService } from './suscriptions.service';
import { CreateSuscriptionDto } from './dto/create-suscription.dto';
import { UpdateSuscriptionDto } from './dto/update-suscription.dto';

@Controller('suscriptions')
export class SuscriptionsController {
  constructor(private readonly suscriptionsService: SuscriptionsService) {}

  @Post()
  create(@Body() createSuscriptionDto: CreateSuscriptionDto) {
    return this.suscriptionsService.create(createSuscriptionDto);
  }

  @Get()
  findAll() {
    return this.suscriptionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suscriptionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSuscriptionDto: UpdateSuscriptionDto) {
    return this.suscriptionsService.update(+id, updateSuscriptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suscriptionsService.remove(+id);
  }
}

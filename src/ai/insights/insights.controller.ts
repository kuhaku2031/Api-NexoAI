import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InsightsService } from './insights.service';
import { CreateInsightDto } from './dto/create-insight.dto';
import { UpdateInsightDto } from './dto/update-insight.dto';

@Controller('insights')
export class InsightsController {
  constructor(private readonly insightsService: InsightsService) {}

  @Post()
  create(@Body() createInsightDto: CreateInsightDto) {
    return this.insightsService.create(createInsightDto);
  }

  @Get()
  findAll() {
    return this.insightsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.insightsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInsightDto: UpdateInsightDto) {
    return this.insightsService.update(+id, updateInsightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.insightsService.remove(+id);
  }
}

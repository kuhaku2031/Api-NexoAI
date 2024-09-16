import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentsDetailsService } from './payments-details.service';
import { CreatePaymentsDetailDto } from './dto/create-payments-detail.dto';
import { UpdatePaymentsDetailDto } from './dto/update-payments-detail.dto';

@Controller('payments-details')
export class PaymentsDetailsController {
  constructor(private readonly paymentsDetailsService: PaymentsDetailsService) {}

  @Post()
  create(@Body() createPaymentsDetailDto: CreatePaymentsDetailDto) {
    return this.paymentsDetailsService.create(createPaymentsDetailDto);
  }

  @Get()
  findAll() {
    return this.paymentsDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentsDetailDto: UpdatePaymentsDetailDto) {
    return this.paymentsDetailsService.update(+id, updatePaymentsDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsDetailsService.remove(+id);
  }
}

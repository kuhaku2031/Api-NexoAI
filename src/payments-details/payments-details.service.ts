import { Injectable } from '@nestjs/common';
import { CreatePaymentsDetailDto } from './dto/create-payments-detail.dto';
import { UpdatePaymentsDetailDto } from './dto/update-payments-detail.dto';

@Injectable()
export class PaymentsDetailsService {
  create(createPaymentsDetailDto: CreatePaymentsDetailDto) {
    return 'This action adds a new paymentsDetail';
  }

  findAll() {
    return `This action returns all paymentsDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentsDetail`;
  }

  update(id: number, updatePaymentsDetailDto: UpdatePaymentsDetailDto) {
    return `This action updates a #${id} paymentsDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentsDetail`;
  }
}

import { Module } from '@nestjs/common';
import { PaymentsMethodsService } from './payments-methods.service';
import { PaymentsMethodsController } from './payments-methods.controller';

@Module({
  controllers: [PaymentsMethodsController],
  providers: [PaymentsMethodsService],
})
export class PaymentsMethodsModule {}

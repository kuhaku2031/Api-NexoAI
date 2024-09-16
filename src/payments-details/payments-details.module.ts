import { Module } from '@nestjs/common';
import { PaymentsDetailsService } from './payments-details.service';
import { PaymentsDetailsController } from './payments-details.controller';

@Module({
  controllers: [PaymentsDetailsController],
  providers: [PaymentsDetailsService],
})
export class PaymentsDetailsModule {}

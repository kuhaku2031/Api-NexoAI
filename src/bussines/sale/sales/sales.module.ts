import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { PointSaleModule } from 'src/bussines/pos/point-sale/point-sale.module';
import { PaymentsModule } from 'src/bussines/payment/payments/payments.module';
import { PaymentsDetailsModule } from 'src/bussines/payment/payments-details/payments-details.module';
import { SalesDetailsModule } from '../sales-details/sales-details.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale]),
    SalesDetailsModule,
    PointSaleModule,
    PaymentsModule,
    PaymentsDetailsModule,
  ],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}

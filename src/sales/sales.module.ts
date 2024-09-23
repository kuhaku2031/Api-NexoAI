import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { SalesDetailsModule } from 'src/sales-details/sales-details.module';
import { PointSaleModule } from 'src/point-sale/point-sale.module';
import { PaymentsModule } from 'src/payments/payments.module';
import { PaymentsDetailsModule } from 'src/payments-details/payments-details.module';

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

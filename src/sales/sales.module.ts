import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { SalesDetailsModule } from 'src/sales-details/sales-details.module';
import { PointSaleModule } from 'src/point-sale/point-sale.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sale]), SalesDetailsModule, PointSaleModule],
  controllers: [SalesController],
  providers: [SalesService, SalesDetailsModule, PointSaleModule],
})
export class SalesModule {}

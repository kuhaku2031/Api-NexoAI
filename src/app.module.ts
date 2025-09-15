import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Import all modules here
import { BussinesModule } from './bussines/bussines.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { AiModule } from './ai/ai.module';


//  Import all entities here
import { Category } from './bussines/inventory/categories/entities/category.entity';
import { Product } from './bussines/inventory/products/entities/product.entity';
import { PointSale } from './bussines/pos/point-sale/entities/point-sale.entity';
import { Payment } from './bussines/payment/payments/entities/payment.entity';
import { PaymentsDetail } from './bussines/payment/payments-details/entities/payments-detail.entity';
import { PaymentsMethod } from './bussines/payment/payments-methods/entities/payments-method.entity';
import { Sale } from './bussines/sale/sales/entities/sale.entity';
import { SalesDetail } from './bussines/sale/sales-details/entities/sales-detail.entity';
import { CommonModule } from './common/common.module';
import { CoreModule } from './core/core.module';




@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'postgres',
      entities: [
        Category,
        Product,
        Sale,
        SalesDetail,
        PointSale,
        Payment,
        PaymentsDetail,
        PaymentsMethod,
      ],
      autoLoadEntities: true,
      synchronize: true,
    }),

    // Add all modules here

    AiModule,
    AnalyticsModule,
    BussinesModule,
    CommonModule,
    CoreModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

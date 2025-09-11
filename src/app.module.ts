import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './bussines/inventory/products/products.module';
import { CategoriesModule } from './bussines/inventory/categories/categories.module';
import { PaymentsModule } from './bussines/payment/payments/payments.module';
import { PaymentsMethodsModule } from './bussines/payment/payments-methods/payments-methods.module';
import { PointSaleModule } from './bussines/pos/point-sale/point-sale.module';
import { PaymentsDetailsModule } from './bussines/payment/payments-details/payments-details.module';
import { Category } from './bussines/inventory/categories/entities/category.entity';
import { Product } from './bussines/inventory/products/entities/product.entity';
import { PointSale } from './bussines/pos/point-sale/entities/point-sale.entity';
import { Payment } from './bussines/payment/payments/entities/payment.entity';
import { PaymentsDetail } from './bussines/payment/payments-details/entities/payments-detail.entity';
import { PaymentsMethod } from './bussines/payment/payments-methods/entities/payments-method.entity';
import { CommonModule } from './common/common.module';
import { CompaniesModule } from './core/companies/companies.module';
import { CoreModule } from './core/core.module';
import { Sale } from './bussines/sale/sales/entities/sale.entity';
import { SalesDetail } from './bussines/sale/sales-details/entities/sales-detail.entity';
import { SalesModule } from './bussines/sale/sales/sales.module';
import { SalesDetailsModule } from './bussines/sale/sales-details/sales-details.module';

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

    ProductsModule,
    CategoriesModule,
    SalesModule,
    SalesDetailsModule,
    PaymentsModule,
    PaymentsMethodsModule,
    PointSaleModule,
    PaymentsDetailsModule,
    CommonModule,
    CoreModule,
    CompaniesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

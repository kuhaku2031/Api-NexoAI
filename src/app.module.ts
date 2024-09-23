import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { SalesModule } from './sales/sales.module';
import { SalesDetailsModule } from './sales-details/sales-details.module';
import { PaymentsModule } from './payments/payments.module';
import { PaymentsMethodsModule } from './payments-methods/payments-methods.module';
import { PointSaleModule } from './point-sale/point-sale.module';
import { PaymentsDetailsModule } from './payments-details/payments-details.module';
import { Category } from './categories/entities/category.entity';
import { Product } from './products/entities/product.entity';
import { Sale } from './sales/entities/sale.entity';
import { SalesDetail } from './sales-details/entities/sales-detail.entity';
import { PointSale } from './point-sale/entities/point-sale.entity';
import { Payment } from './payments/entities/payment.entity';
import { PaymentsDetail } from './payments-details/entities/payments-detail.entity';
import { PaymentsMethod } from './payments-methods/entities/payments-method.entity';

@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'tauri-backend',
      entities: [Category, Product, Sale, SalesDetail, PointSale, Payment, PaymentsDetail, PaymentsMethod],
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

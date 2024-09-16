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

@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'tauri-backend',
      entities: [],
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

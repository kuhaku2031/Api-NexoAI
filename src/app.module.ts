import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Import all modules here
import { BussinesModule } from './bussines/bussines.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { AiModule } from './ai/ai.module';
import { BillingModule } from './core/billing/billing.module';
import { CommonModule } from './common/common.module';
import { CoreModule } from './core/core.module';

//  Import all entities here
import { Category } from './bussines/inventory/categories/entities/category.entity';
import { Product } from './bussines/inventory/products/entities/product.entity';
import { PointSale } from './bussines/pos/point-sale/entities/point-sale.entity';
import { Payment } from './bussines/payment/payments/entities/payment.entity';
import { PaymentsDetail } from './bussines/payment/payments-details/entities/payments-detail.entity';
import { PaymentsMethod } from './bussines/payment/payments-methods/entities/payments-method.entity';
import { Sale } from './bussines/sale/sales/entities/sale.entity';
import { SalesDetail } from './bussines/sale/sales-details/entities/sales-detail.entity';
import { Company } from './core/companies/entities/company.entity';
import { Users } from './core/users/entities/user.entity';
import { Subscription } from './core/billing/suscription/entities/suscription.entity';
import { SubscriptionPlan } from './core/billing/suscription-plans/entities/suscription-plan.entity';
import { SubscriptionUsage } from './core/billing/suscription-usage/entities/suscription-usage.entity';



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

        // BUSINESs
        // {inventory}
        Category,
        Product,
        
        // {payment}
        Payment,
        PaymentsDetail,
        PaymentsMethod,

        // {pos}
        PointSale,

        // {sale}
        Sale,
        SalesDetail,

        // CORE 
        // {billing}
        Subscription,
        SubscriptionPlan,
        SubscriptionUsage,

        // {companies}
        Company,

        // {users}
        Users
      ],
      autoLoadEntities: true,
      synchronize: true,
    }),

    // Add all modules here

    AiModule,
    AnalyticsModule,
    BussinesModule,
    CommonModule,
    CoreModule,
    BillingModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

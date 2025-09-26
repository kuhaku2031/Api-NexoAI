import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { SuscriptionModule } from './suscription/suscription.module';
import { SuscriptionUsageModule } from './suscription-usage/suscription-usage.module';
import { SuscriptionPlansModule } from './suscription-plans/suscription-plans.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    SuscriptionModule,
    SuscriptionUsageModule, 
    SuscriptionPlansModule],
  controllers: [BillingController],
  providers: [BillingService],
  exports: [BillingModule]
})
export class BillingModule {}

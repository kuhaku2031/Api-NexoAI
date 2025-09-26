import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { CoreController } from './core.controller';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';
import { BillingModule } from './billing/billing.module';

@Module({
  imports: [AuthModule, CompaniesModule, BillingModule, UsersModule],
  exports: [AuthModule, CompaniesModule, BillingModule, UsersModule],
  controllers: [CoreController],
  providers: [CoreService],
})
export class CoreModule {}

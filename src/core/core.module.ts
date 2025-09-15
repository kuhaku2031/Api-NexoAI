import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { CoreController } from './core.controller';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { SuscriptionsModule } from './suscriptions/suscriptions.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, CompaniesModule, SuscriptionsModule, UsersModule],
  exports: [AuthModule, CompaniesModule, SuscriptionsModule, UsersModule],
  controllers: [CoreController],
  providers: [CoreService],
})
export class CoreModule {}

import { Module } from '@nestjs/common';
import { SuscriptionUsageService } from './suscription-usage.service';
import { SuscriptionUsageController } from './suscription-usage.controller';
import { SubscriptionUsage } from './entities/suscription-usage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionUsage])],
  controllers: [SuscriptionUsageController],
  providers: [SuscriptionUsageService],
  exports: [TypeOrmModule],
})
export class SuscriptionUsageModule {}

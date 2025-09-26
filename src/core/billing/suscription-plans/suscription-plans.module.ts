import { Module } from '@nestjs/common';
import { SuscriptionPlansService } from './suscription-plans.service';
import { SuscriptionPlansController } from './suscription-plans.controller';
import { SubscriptionPlan } from './entities/suscription-plan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionPlan])],
  controllers: [SuscriptionPlansController],
  providers: [SuscriptionPlansService],
  exports: [TypeOrmModule],
})
export class SuscriptionPlansModule {}

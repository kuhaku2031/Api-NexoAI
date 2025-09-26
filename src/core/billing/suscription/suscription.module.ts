import { Module } from '@nestjs/common';
import { SuscriptionService } from './suscription.service';
import { SuscriptionController } from './suscription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entities/suscription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription])],
  controllers: [SuscriptionController],
  providers: [SuscriptionService],
  exports: [TypeOrmModule],
})
export class SuscriptionModule {}

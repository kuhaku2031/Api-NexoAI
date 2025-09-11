import { Module } from '@nestjs/common';
import { SuscriptionsService } from './suscriptions.service';
import { SuscriptionsController } from './suscriptions.controller';

@Module({
  controllers: [SuscriptionsController],
  providers: [SuscriptionsService],
})
export class SuscriptionsModule {}

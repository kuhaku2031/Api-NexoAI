import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

// Import all modules here
import { BussinesModule } from './business/bussines.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { AiModule } from './ai/ai.module';
import { BillingModule } from './core/billing/billing.module';
import { CommonModule } from './common/common.module';
import { CoreModule } from './core/core.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { FirestoreModule } from './ai/firestore/firestore.module';
import { EmbeddingsModule } from './ai/embeddings/embeddings.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 60,
    }]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        url: configService.get<string>('DB_URL'),
        extra: {
          sslmode: 'require',
          connect_timeout: 10000,
        },
        type: (configService.get<string>('DB_TYPE') as any) || 'postgres',
        autoLoadEntities: true,
        synchronize: false,
        migrations: ['dist/migrations/*.js'],
        migrationsTableName: '_migrations',
        migrationsRun: process.env.NODE_ENV !== 'production',
      }),
    }),

    // Add all modules here
    AiModule,
    AnalyticsModule,
    BussinesModule,
    CommonModule,
    CoreModule,
    BillingModule,
    IntegrationsModule,
    FirestoreModule,
    EmbeddingsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}

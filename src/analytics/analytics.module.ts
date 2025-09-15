import { Module } from '@nestjs/common';
import { DashboardsModule } from './dashboards/dashboards.module';
import { ReportsModule } from './reports/reports.module';

@Module({

    imports: [DashboardsModule, ReportsModule],
    exports: [DashboardsModule, ReportsModule],
    controllers: [],
    providers: [],
})
export class AnalyticsModule {}

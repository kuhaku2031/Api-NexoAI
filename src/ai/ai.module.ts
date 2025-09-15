import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { InsightsModule } from './insights/insights.module';
import { N8nModule } from './n8n/n8n.module';

@Module({

    imports: [ChatModule, InsightsModule, N8nModule],
    exports: [ChatModule, InsightsModule, N8nModule],
    controllers: [],
    providers: [],
})
export class AiModule {}

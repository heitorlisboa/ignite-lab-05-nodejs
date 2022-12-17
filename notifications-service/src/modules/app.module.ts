import { Module } from '@nestjs/common';

import { HttpModule } from './http.module';
import { DatabaseModule } from '@/shared/database/database.module';
import { MessagingModule } from './messaging.module';

@Module({
  imports: [HttpModule, DatabaseModule, MessagingModule],
})
export class AppModule {}

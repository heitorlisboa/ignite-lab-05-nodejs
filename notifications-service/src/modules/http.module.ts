import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/shared/database/database.module';
import { NotificationsController } from '../controllers/notifications.controller';
import { SendNotification } from '@/app/use-cases/send-notification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [SendNotification],
})
export class HttpModule {}

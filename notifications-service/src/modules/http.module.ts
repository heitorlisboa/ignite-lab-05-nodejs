import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/shared/database/database.module';
import { NotificationsController } from '../controllers/notifications.controller';
import { GetRecipientNotifications } from '@/app/use-cases/get-recipient-notifications';
import { CountRecipientNotifications } from '@/app/use-cases/count-recipient-notifications';
import { SendNotification } from '@/app/use-cases/send-notification';
import { MarkNotificationAsRead } from '@/app/use-cases/mark-notification-as-read';
import { MarkNotificationAsUnread } from '@/app/use-cases/mark-notification-as-unread';
import { CancelNotification } from '@/app/use-cases/cancel-notification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    GetRecipientNotifications,
    CountRecipientNotifications,
    SendNotification,
    MarkNotificationAsRead,
    MarkNotificationAsUnread,
    CancelNotification,
  ],
})
export class HttpModule {}

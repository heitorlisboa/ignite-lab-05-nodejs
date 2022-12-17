import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { GetRecipientNotifications } from '@/app/use-cases/get-recipient-notifications';
import { CountRecipientNotifications } from '@/app/use-cases/count-recipient-notifications';
import { SendNotification } from '@/app/use-cases/send-notification';
import { MarkNotificationAsRead } from '@/app/use-cases/mark-notification-as-read';
import { MarkNotificationAsUnread } from '@/app/use-cases/mark-notification-as-unread';
import { CancelNotification } from '@/app/use-cases/cancel-notification';
import { CreateNotificationDto } from '../dtos/create-notification-dto';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private getRecipientNotifications: GetRecipientNotifications,
    private countRecipientNotifications: CountRecipientNotifications,
    private sendNotification: SendNotification,
    private markNotificationAsRead: MarkNotificationAsRead,
    private markNotificationAsUnread: MarkNotificationAsUnread,
    private cancelNotification: CancelNotification
  ) {}

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return { notifications };
  }

  @Get('from/:recipientId/count')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return { count };
  }

  @Post()
  async send(@Body() body: CreateNotificationDto) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return { notification };
  }

  @Patch(':id/mark-as-read')
  async markAsRead(@Param('id') id: string) {
    await this.markNotificationAsRead.execute({ notificationId: id });
  }

  @Patch(':id/mark-as-unread')
  async markAsUnread(@Param('id') id: string) {
    await this.markNotificationAsUnread.execute({ notificationId: id });
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id });
  }
}

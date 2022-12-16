import { Injectable } from '@nestjs/common';

import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFoundError } from './errors/notification-not-found-error';

type MarkNotificationAsUnreadRequest = {
  notificationId: string;
};

type MarkNotificationAsUnreadResponse = void;

@Injectable()
export class MarkNotificationAsUnread {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: MarkNotificationAsUnreadRequest
  ): Promise<MarkNotificationAsUnreadResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId
    );

    if (!notification) throw new NotificationNotFoundError();

    notification.markAsUnread();
    await this.notificationsRepository.update(notification);
  }
}

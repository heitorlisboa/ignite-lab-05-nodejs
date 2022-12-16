import { Injectable } from '@nestjs/common';

import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFoundError } from './errors/notification-not-found-error';

type MarkNotificationAsReadRequest = {
  notificationId: string;
};

type MarkNotificationAsReadResponse = void;

@Injectable()
export class MarkNotificationAsRead {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: MarkNotificationAsReadRequest
  ): Promise<MarkNotificationAsReadResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId
    );

    if (!notification) throw new NotificationNotFoundError();

    notification.markAsRead();
    await this.notificationsRepository.update(notification);
  }
}

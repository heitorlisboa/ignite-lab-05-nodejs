import { Injectable } from '@nestjs/common';

import { Notification } from '../models/notification';
import { NotificationsRepository } from '../repositories/notifications-repository';

type SendNotificationRequest = {
  recipientId: string;
  content: string;
  category: string;
};

type SendNotificationResponse = {
  notification: Notification;
};

@Injectable()
export class SendNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: SendNotificationRequest
  ): Promise<SendNotificationResponse> {
    const { recipientId, content, category } = request;

    const notification = new Notification({ recipientId, content, category });

    await this.notificationsRepository.create(notification);

    return { notification };
  }
}

import { Injectable } from '@nestjs/common';

import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationMapper } from '@/shared/mappers/notification-mapper';
import type { NotificationView } from '@/shared/types/notification';

type GetRecipientNotificationsRequest = {
  recipientId: string;
};

type GetRecipientNotificationsResponse = {
  notifications: NotificationView[];
};

@Injectable()
export class GetRecipientNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: GetRecipientNotificationsRequest
  ): Promise<GetRecipientNotificationsResponse> {
    const { recipientId } = request;

    const notifications = (
      await this.notificationsRepository.findManyByRecipientId(recipientId)
    ).map((notification) => NotificationMapper.formatToView(notification));

    return { notifications };
  }
}

import { NotificationsRepository } from '../notifications-repository';
import { NotificationMapper } from '@/shared/mappers/notification-mapper';
import type { Notification } from '@/app/models/notification';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  private notifications: Notification[] = [];

  async findById(id: string): Promise<Notification | null> {
    const notification =
      this.notifications.find((notification) => notification.id === id) ?? null;
    return notification;
  }

  async findMany(): Promise<Notification[]> {
    return [...this.notifications];
  }

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }

  async update(notification: Notification): Promise<void> {
    const foundNotification = await this.findById(notification.id);
    foundNotification?.updateProps(NotificationMapper.format(notification));
  }

  async countByRecipientId(recipientId: string): Promise<number> {
    const recipientNotifications = this.notifications.filter(
      (notification) => notification.recipientId === recipientId
    );
    return recipientNotifications.length;
  }
}

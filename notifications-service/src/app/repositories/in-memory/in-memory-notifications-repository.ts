import { NotificationsRepository } from '../notifications-repository';
import type { Notification } from '@/app/models/notification';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  private notifications: Notification[] = [];

  async findMany(): Promise<Notification[]> {
    return [...this.notifications];
  }

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }
}

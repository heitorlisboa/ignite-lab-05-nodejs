import type { Notification } from '../models/notification';

export abstract class NotificationsRepository {
  abstract findMany(): Promise<Notification[]>;
  abstract create(notification: Notification): Promise<void>;
}

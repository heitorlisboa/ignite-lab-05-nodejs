import type { Notification } from '../models/notification';

export abstract class NotificationsRepository {
  abstract findById(id: string): Promise<Notification | null>;
  abstract findMany(): Promise<Notification[]>;
  abstract create(notification: Notification): Promise<void>;
  abstract update(notification: Notification): Promise<void>;
}

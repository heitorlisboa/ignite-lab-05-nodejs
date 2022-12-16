import type { Notification } from '../models/notification';

export abstract class NotificationsRepository {
  abstract findById(id: string): Promise<Notification | null>;
  abstract findMany(): Promise<Notification[]>;
  abstract findManyByRecipientId(recipientId: string): Promise<Notification[]>;
  abstract create(notification: Notification): Promise<void>;
  abstract update(notification: Notification): Promise<void>;
  abstract countByRecipientId(recipientId: string): Promise<number>;
}

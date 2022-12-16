import type { NotificationMapper } from '../mappers/notification-mapper';

export type RawNotification = ReturnType<typeof NotificationMapper['format']>;

export type NotificationView = ReturnType<
  typeof NotificationMapper['formatToView']
>;

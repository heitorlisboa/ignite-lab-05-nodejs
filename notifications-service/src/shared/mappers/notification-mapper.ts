import { Notification } from '@/app/models/notification';

export const NotificationMapper = {
  format(notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      content: notification.content,
      category: notification.category,
      readAt: notification.readAt,
      canceledAt: notification.canceledAt,
      createdAt: notification.createdAt,
    };
  },

  formatToView(notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      content: notification.content,
      category: notification.category,
      readAt: notification.readAt,
      canceledAt: notification.canceledAt,
    };
  },
};

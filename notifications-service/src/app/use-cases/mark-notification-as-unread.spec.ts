import { randomUUID } from 'node:crypto';

import { InMemoryNotificationsRepository } from '../repositories/in-memory/in-memory-notifications-repository';
import { MarkNotificationAsUnread } from './mark-notification-as-unread';
import { Notification } from '../models/notification';
import { NotificationNotFoundError } from './errors/notification-not-found-error';

let notificationsRepository: InMemoryNotificationsRepository;
let markNotificationAsUnread: MarkNotificationAsUnread;

describe('Mark notification as unread', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    markNotificationAsUnread = new MarkNotificationAsUnread(
      notificationsRepository
    );
  });

  it('should be able to mark a notification as unread', async () => {
    // Creating the already read notification
    const notification = new Notification({
      recipientId: randomUUID(),
      content: 'This is a notification',
      category: 'Category',
      readAt: new Date(),
    });
    notificationsRepository.create(notification);

    // Marking the notification as unread
    await markNotificationAsUnread.execute({ notificationId: notification.id });

    const allNotifications = await notificationsRepository.findMany();
    const updatedNotification = allNotifications[0];

    expect(updatedNotification.readAt).toBeNull();
  });

  it('should not be able to mark a nonexistent notification as unread', async () => {
    const action = async () => {
      // Marking the notification as unread without creating it first
      await markNotificationAsUnread.execute({ notificationId: randomUUID() });
    };

    expect(action).rejects.toThrow(NotificationNotFoundError);
  });
});

import { randomUUID } from 'node:crypto';

import { InMemoryNotificationsRepository } from '../repositories/in-memory/in-memory-notifications-repository';
import { MarkNotificationAsRead } from './mark-notification-as-read';
import { Notification } from '../models/notification';
import { NotificationNotFoundError } from './errors/notification-not-found-error';

let notificationsRepository: InMemoryNotificationsRepository;
let markNotificationAsRead: MarkNotificationAsRead;

describe('Mark notification as read', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    markNotificationAsRead = new MarkNotificationAsRead(
      notificationsRepository
    );
  });

  it('should be able to mark a notification as read', async () => {
    // Creating the notification
    const notification = new Notification({
      recipientId: randomUUID(),
      content: 'This is a notification',
      category: 'Category',
    });
    notificationsRepository.create(notification);

    // Marking the notification as read
    await markNotificationAsRead.execute({ notificationId: notification.id });

    const allNotifications = await notificationsRepository.findMany();
    const updatedNotification = allNotifications[0];

    expect(updatedNotification.readAt).toEqual(expect.any(Date));
  });

  it('should not be able to mark a nonexistent notification as read', async () => {
    const action = async () => {
      // Marking the notification as read without creating it first
      await markNotificationAsRead.execute({ notificationId: randomUUID() });
    };

    expect(action).rejects.toThrow(NotificationNotFoundError);
  });
});

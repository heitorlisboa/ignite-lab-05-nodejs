import { randomUUID } from 'node:crypto';

import { InMemoryNotificationsRepository } from '../repositories/in-memory/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { Notification } from '../models/notification';
import { NotificationNotFoundError } from './errors/notification-not-found-error';

let notificationsRepository: InMemoryNotificationsRepository;
let cancelNotification: CancelNotification;

describe('Cancel notification', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    cancelNotification = new CancelNotification(notificationsRepository);
  });

  it('should be able to cancel a notification', async () => {
    // Creating the notification
    const notification = new Notification({
      recipientId: randomUUID(),
      content: 'This is a notification',
      category: 'Category',
    });
    notificationsRepository.create(notification);

    // Canceling the notification
    await cancelNotification.execute({ notificationId: notification.id });

    const allNotifications = await notificationsRepository.findMany();
    const updatedNotification = allNotifications[0];

    expect(updatedNotification.canceledAt).toEqual(expect.any(Date));
  });

  it('should not be able to cancel a nonexistent notification', async () => {
    const action = async () => {
      // Canceling the notification without creating it first
      await cancelNotification.execute({ notificationId: randomUUID() });
    };

    expect(action).rejects.toThrow(NotificationNotFoundError);
  });
});

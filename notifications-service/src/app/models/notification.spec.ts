import { NotificationMapper } from '@/shared/mappers/notification-mapper';
import { randomUUID } from 'node:crypto';
import { ZodError } from 'zod';

import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    expect(() => {
      new Notification({
        recipientId: randomUUID(),
        content: 'This is a notification',
        category: 'Category',
      });
    }).not.toThrow();
  });

  it('should not be able to create a notification with content with less than 5 characters', () => {
    const action = () => {
      new Notification({
        recipientId: randomUUID(),
        content: '',
        category: 'Category',
      });
    };

    expect(action).toThrow(ZodError);
    expect(action).toThrow(/least*.5.*char/i);
  });

  it('should not be able to create a notification with content with more than 256 characters', () => {
    const action = () => {
      new Notification({
        recipientId: randomUUID(),
        content: 'a'.repeat(257),
        category: 'Category',
      });
    };

    expect(action).toThrow(ZodError);
    expect(action).toThrow(/most*.256.*char/i);
  });

  it('should be able to update the notification props', () => {
    const notification = new Notification({
      recipientId: randomUUID(),
      content: 'This is a notification',
      category: 'Category',
    });

    const newProps: Parameters<typeof notification['updateProps']>[0] = {
      content: 'This is an updated notification',
      category: 'Another category',
    };
    notification.updateProps(newProps);

    const rawNotification = NotificationMapper.format(notification);

    expect(rawNotification).toEqual(expect.objectContaining(newProps));
  });

  it('should be able to mark a notification as read', () => {
    const notification = new Notification({
      recipientId: randomUUID(),
      content: 'This is a notification',
      category: 'Category',
    });
    notification.markAsRead();

    expect(notification.readAt).toEqual(expect.any(Date));
  });

  it('should be able to mark a notification as unread', () => {
    // Creating the already read notification
    const notification = new Notification({
      recipientId: randomUUID(),
      content: 'This is a notification',
      category: 'Category',
      readAt: new Date(),
    });
    notification.markAsUnread();

    expect(notification.readAt).toBeNull();
  });

  it('should be able to cancel a notification', () => {
    const notification = new Notification({
      recipientId: randomUUID(),
      content: 'This is a notification',
      category: 'Category',
    });
    notification.cancel();

    expect(notification.canceledAt).toEqual(expect.any(Date));
  });
});

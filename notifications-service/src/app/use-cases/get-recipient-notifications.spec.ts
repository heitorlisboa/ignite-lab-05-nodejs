import { randomUUID } from 'node:crypto';

import { InMemoryNotificationsRepository } from '../repositories/in-memory/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';
import { Notification } from '../models/notification';
import { NotificationMapper } from '@/shared/mappers/notification-mapper';

let notificationsRepository: InMemoryNotificationsRepository;
let getRecipientNotifications: GetRecipientNotifications;

describe('Get recipient notifications', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    getRecipientNotifications = new GetRecipientNotifications(
      notificationsRepository
    );
  });

  it('should be able to get the recipient notifications', async () => {
    const recipientId = randomUUID();
    // Creating the notification for the recipient
    const notification = new Notification({
      recipientId,
      content: 'This is a notification',
      category: 'Category',
    });
    notificationsRepository.create(notification);

    // Creating a notification for another recipient
    notificationsRepository.create(
      new Notification({
        recipientId: randomUUID(),
        content: 'This is a notification',
        category: 'Category',
      })
    );

    const { notifications } = await getRecipientNotifications.execute({
      recipientId,
    });

    expect(notifications).toHaveLength(1);
    expect(notifications[0]).toMatchObject(
      NotificationMapper.formatToView(notification)
    );
  });
});

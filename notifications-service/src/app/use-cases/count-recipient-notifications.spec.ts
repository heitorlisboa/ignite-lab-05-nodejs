import { randomUUID } from 'node:crypto';

import { InMemoryNotificationsRepository } from '../repositories/in-memory/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';
import { Notification } from '../models/notification';

let notificationsRepository: InMemoryNotificationsRepository;
let countRecipientNotifications: CountRecipientNotifications;

describe('Count recipient notifications', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository
    );
  });

  it('should be able to count the notifications from a recipient', async () => {
    const recipientId = randomUUID();
    // Creating the notification for the recipient
    notificationsRepository.create(
      new Notification({
        recipientId,
        content: 'This is a notification',
        category: 'Category',
      })
    );

    // Creating a notification for another recipient
    notificationsRepository.create(
      new Notification({
        recipientId: randomUUID(),
        content: 'This is a notification',
        category: 'Category',
      })
    );

    // Counting the notifications
    const { count } = await countRecipientNotifications.execute({
      recipientId,
    });

    expect(count).toEqual(1);
  });
});

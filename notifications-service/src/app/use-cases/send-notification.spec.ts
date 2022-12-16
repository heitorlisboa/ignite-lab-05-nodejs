import { randomUUID } from 'node:crypto';

import { InMemoryNotificationsRepository } from '../repositories/in-memory/in-memory-notifications-repository';
import { SendNotification } from './send-notification';

let notificationsRepository: InMemoryNotificationsRepository;
let sendNotification: SendNotification;

describe('Send notification', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    sendNotification = new SendNotification(notificationsRepository);
  });

  it('should be able to send a notification', async () => {
    const { notification } = await sendNotification.execute({
      recipientId: randomUUID(),
      content: 'This is a notification',
      category: 'Category',
    });

    const allNotifications = await notificationsRepository.findMany();

    expect(allNotifications).toHaveLength(1);
    expect(allNotifications[0]).toMatchObject(notification);
  });
});
